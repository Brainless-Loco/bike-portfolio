import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox"
import Swal from "sweetalert2";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from './../../Utils/Firebase';
import PersonalData from "../../Components/ApplicationForm/PersonalData";
import Education from "../../Components/ApplicationForm/Education";
import JobHistory from "../../Components/ApplicationForm/JobHistory";
import Advertisement from "../../Components/ApplicationForm/Advertisement";
import ApplicationDocs from "../../Components/ApplicationForm/ApplicationDocs";
import OtherDocs from "../../Components/ApplicationForm/OtherDocs";
import References from "../../Components/ApplicationForm/References";
import Publications from "../../Components/ApplicationForm/Publications";
import TermsOfUse from "../../Components/ApplicationForm/TermsOfUse";
import { Helmet } from "react-helmet";


const ApplicationForm = ({ setNonHomePath }) => {
    const { id: vacancyId } = useParams();
    const [personalData, setPersonalData] = useState({});
    const [educationList, setEducationList] = useState([]);
    const [jobHistory, setJobHistory] = useState({});
    const [advertisement, setAdvertisement] = useState({});
    const [applicationDocs, setApplicationDocs] = useState({});
    const [otherDocs, setOtherDocs] = useState([]);
    const [references, setReferences] = useState([]);
    const [publications, setPublications] = useState([]);
    const [termsAccepted, setTermsAccepted] = useState(false);

    // Upload Files & Get URLs
    const uploadFiles = async (files) => {
        // files: object where values are File instances
        const entries = Object.entries(files || {}).filter(([, file]) => file && typeof file !== "string");
        if (entries.length === 0) return {};

        // Create a unique folder name using personal data
        const folderName = `${personalData.firstName}${personalData.lastName}${personalData.email}`
            .toLowerCase()
            .replace(/[^a-z0-9]/g, ''); // Remove all special characters

        const timestamp = Date.now(); // Single timestamp for all files
        const basePath = `Applications/${vacancyId}/${timestamp}_${folderName}`;

        const uploadPromises = entries.map(async ([key, file]) => {
            // Determine subfolder based on the file type
            let subfolder = 'others';
            if (key.startsWith('applicationDocs_')) {
                subfolder = 'applicationDocs';
            } else if (key.startsWith('otherDocs_')) {
                subfolder = 'otherDocs';
            } else if (key.startsWith('reference_')) {
                subfolder = 'references';
            } else if (key.startsWith('publication_')) {
                subfolder = 'publications';
            }

            const filePath = `${basePath}/${subfolder}/${key}`;
            const storageRef = ref(storage, filePath);
            await uploadBytes(storageRef, file);
            return { key, url: await getDownloadURL(storageRef) };
        });

        const fileUrls = await Promise.all(uploadPromises);
        return fileUrls.reduce((acc, { key, url }) => ({ ...acc, [key]: url }), {});
    };

    // Handle Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate mandatory fields
        // 1. Personal Data: require all fields to be non-empty
        const personalRequired = ["firstName", "lastName", "email", "mobile", "country", "address"];
        const missingPersonal = personalRequired.filter(field => !personalData[field] || personalData[field].toString().trim() === "");

        // 2. Application Documents: require all three
        const missingAppDocs = ["motivationLetter", "cv", "cover_letter"].filter(key => !applicationDocs[key]);

        // 3. Terms of Use
        if (missingPersonal.length > 0) {
            Swal.fire("Error", "Please fill all required personal data fields.", "error");
            return;
        }
        if (missingAppDocs.length > 0) {
            Swal.fire("Error", "Please upload all required application documents (Motivation Letter, CV, Cover Letter).", "error");
            return;
        }
        if (!termsAccepted) {
            Swal.fire("Error", "You must accept the terms of use.", "error");
            return;
        }

        try {
            // Build a map of only actual File objects to upload with stable keys
            const filesToUpload = {};

            // Application documents (three fields)
            if (applicationDocs) {
                if (applicationDocs.motivationLetter) filesToUpload[`applicationDocs_motivationLetter`] = applicationDocs.motivationLetter;
                if (applicationDocs.cv) filesToUpload[`applicationDocs_cv`] = applicationDocs.cv;
                if (applicationDocs.cover_letter) filesToUpload[`applicationDocs_cover_letter`] = applicationDocs.cover_letter;
            }

            // Other documents (array of {title, file})
            (otherDocs || []).forEach((doc, idx) => {
                if (doc && doc.file) filesToUpload[`otherDocs_${idx}`] = doc.file;
            });

            // References (array of File or null)
            (references || []).forEach((refFile, idx) => {
                if (refFile) filesToUpload[`reference_${idx}`] = refFile;
            });

            // Publications (array of {title, file, coAuthorStatement})
            (publications || []).forEach((pub, idx) => {
                if (pub) {
                    if (pub.file) filesToUpload[`publication_${idx}_file`] = pub.file;
                    if (pub.coAuthorStatement) filesToUpload[`publication_${idx}_coAuthorStatement`] = pub.coAuthorStatement;
                }
            });

            // Show SweetAlert for uploading files
            Swal.fire({
                title: "Uploading Files",
                text: "Please wait while we upload your files...",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const uploadedFiles = await uploadFiles(filesToUpload);

            // Close the loading Swal after file upload
            Swal.close();

            // Build the structured documents JSON with empty strings for missing files
            const documents = {
                applicationDocs: {
                    motivationLetter: uploadedFiles[`applicationDocs_motivationLetter`] || "",
                    cv: uploadedFiles[`applicationDocs_cv`] || "",
                    cover_letter: uploadedFiles[`applicationDocs_cover_letter`] || "",
                },
                otherDocs: (otherDocs || []).map((doc, idx) => ({
                    title: (doc && doc.title) || "",
                    url: uploadedFiles[`otherDocs_${idx}`] || "",
                })),
                references: (references || []).map((refFile, idx) => uploadedFiles[`reference_${idx}`] || ""),
                publications: (publications || []).map((pub, idx) => ({
                    title: (pub && pub.title) || "",
                    file: uploadedFiles[`publication_${idx}_file`] || "",
                    coAuthorStatement: uploadedFiles[`publication_${idx}_coAuthorStatement`] || "",
                })),
            };

            const applicationData = {
                personalData,
                education: educationList,
                jobHistory,
                advertisement,
                documents,
                termsAccepted,
                timestamp: new Date(),
            };

            await addDoc(collection(db, `Vacancies/${vacancyId}/Applications`), applicationData);

            // Show success message after form submission
            Swal.fire({
                title: "Success",
                text: "Your application has been submitted!",
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });

        } catch (error) {
            // Handle errors during file upload or submission
            Swal.fire("Error", "Submission failed! Please try again.", "error");
        }
    };


    useEffect(() => {
        setNonHomePath(true)
    }, [setNonHomePath])

    useEffect(() => {
        // check from the firebase if the vacancyId is present and is the the value of is_accepting is true or false (invalid)
        const checkVacancy = async () => {
            try {
                const docRef = doc(db, "Vacancies", vacancyId);
                const docSnap = await getDoc(docRef);
                if (!docSnap.exists() || !docSnap.data().is_accepting) {
                    Swal.fire({
                        title: "Error",
                        text: "This vacancy is not accepting applications or does not exist.",
                        icon: "error",
                        confirmButtonText: "OK"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/vacancies";
                        }
                    });
                }
            } catch (err) {
                Swal.fire({
                    title: "Error",
                    text: "Failed to verify vacancy details.",
                    icon: "error",
                    confirmButtonText: "OK"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/vacancies";
                    }
                });
            }
        };
        checkVacancy();

    }, [vacancyId])


    return (
        <Box className="container mt-4 py-5">
            <Helmet>
                <title>Apply | BIKE Lab</title>
                <meta name="description" content="Apply to join BIKE Lab." />
            </Helmet>
            <Typography variant="h4" color="#0c2461">Application Form</Typography>
            <PersonalData setData={setPersonalData} />
            <Education setData={setEducationList} />
            <JobHistory setData={setJobHistory} />
            <ApplicationDocs setData={setApplicationDocs} />
            <OtherDocs setData={setOtherDocs} />
            <References setData={setReferences} />
            <Publications setData={setPublications} />
            <Advertisement setData={setAdvertisement} />

            <FormControlLabel control={<Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />} label="I accept terms of use *" />
            <Box fullwidth display={"flex"} justifyContent={"center"}>

                <Button variant="contained" color="primary" sx={{ width: '80%' }} onClick={handleSubmit} className="mt-3">Submit Application</Button>
            </Box>

            <TermsOfUse />
        </Box>
    );
};

export default ApplicationForm;
