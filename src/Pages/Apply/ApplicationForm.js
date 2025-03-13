import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox"
import Swal from "sweetalert2";
import { collection, addDoc } from "firebase/firestore";
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
        const uploadPromises = Object.entries(files).map(async ([key, file]) => {
            const filePath = `Applications/${vacancyId}/${Date.now()}/${key}`;
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
        if (!termsAccepted) {
            Swal.fire("Error", "You must accept the terms of use.", "error");
            return;
        }

        try {
            const appFiles = { ...applicationDocs, ...otherDocs, ...references, ...publications };

            // Show SweetAlert for uploading files
            Swal.fire({
                title: "Uploading Files",
                text: "Please wait while we upload your files...",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const uploadedFiles = await uploadFiles(appFiles);

            // Close the loading Swal after file upload
            Swal.close();

            const applicationData = {
                personalData,
                education: educationList,
                jobHistory,
                advertisement,
                documents: uploadedFiles,
                termsAccepted,
                timestamp: new Date(),
            };

            await addDoc(collection(db, `Vacancies/${vacancyId}/Applications`), applicationData);

            // Show success message after form submission
            Swal.fire("Success", "Your application has been submitted!", "success");
        } catch (error) {
            // Handle errors during file upload or submission
            Swal.fire("Error", "Submission failed! Please try again.", "error");
        }
    };


    useEffect(() => {
        setNonHomePath(true)
    }, [setNonHomePath])


    return (
        <Box className="container mt-4 py-5">
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
