import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";
import { db, storage } from "../../Utils/Firebase";

const ApplicationForm = () => {
    const { id: vacancyId } = useParams(); // Get Vacancy ID from URL
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        postalCode: "",
        city: "",
        country: "",
        email: "",
        phone: "",
        mobile: "",
        nationality: "",
        bachelorYear: "",
        bachelorUniversity: "",
        masterYear: "",
        masterField: "",
        masterUniversity: "",
        finalProjectTitle: "",
        phdCompletionYear: "",
        phdUniversity: "",
        phdThesisTitle: "",
        previousWorkplace: "",
        previousOccupation: "",
        howDidYouFindUs: "",
        termsAccepted: false,
    });

    const [countries, setCountries] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState({});
    const [filePreviews, setFilePreviews] = useState({});

    // Fetch country list
    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all?fields=name")
            .then((res) => res.json())
            .then((data) => setCountries(data.map((country) => country.name.common)))
            .catch((error) => console.error("Error fetching countries:", error));
    }, []);

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle File Upload Change
    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (!file) return;

        // Store the file for upload
        setSelectedFiles((prev) => ({ ...prev, [fieldName]: file }));

        // Generate preview if image
        if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreviews((prev) => ({ ...prev, [fieldName]: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Upload files and return URLs
    const uploadFiles = async () => {
        const uploadPromises = Object.entries(selectedFiles).map(async ([fieldName, file]) => {
            const filePath = `Applications/${vacancyId}/${Date.now()}/${fieldName}`;
            const storageRef = ref(storage, filePath);
            await uploadBytes(storageRef, file);
            return { fieldName, url: await getDownloadURL(storageRef) };
        });

        const fileUrls = await Promise.all(uploadPromises);
        return fileUrls.reduce((acc, { fieldName, url }) => ({ ...acc, [fieldName]: url }), {});
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.termsAccepted) {
            Swal.fire("Error", "You must accept the terms of use.", "error");
            return;
        }

        try {
            // Upload files and get URLs
            const fileUrls = await uploadFiles();

            // Merge file URLs with formData
            const submissionData = { ...formData, ...fileUrls, timestamp: new Date() };

            // Store in Firestore
            await addDoc(collection(db, `Vacancies/${vacancyId}/Applications`), submissionData);

            Swal.fire("Success", "Your application has been submitted!", "success");

            // Reset Form
            setFormData({
                firstName: "",
                lastName: "",
                address: "",
                postalCode: "",
                city: "",
                country: "",
                email: "",
                phone: "",
                mobile: "",
                nationality: "",
                bachelorYear: "",
                bachelorUniversity: "",
                masterYear: "",
                masterField: "",
                masterUniversity: "",
                finalProjectTitle: "",
                phdCompletionYear: "",
                phdUniversity: "",
                phdThesisTitle: "",
                previousWorkplace: "",
                previousOccupation: "",
                howDidYouFindUs: "",
                termsAccepted: false,
            });

            setSelectedFiles({});
            setFilePreviews({});
        } catch (error) {
            Swal.fire("Error", "Something went wrong!", "error");
        }
    };

    return (
        <Box className="container mb-5 py-5 bg-white" sx={{marginTop:'8vh', height:'auto'}}>
            <Typography variant="h4" className="text-center">Apply for Position</Typography>

            {/* Personal Data Section */}
            <Box className="border p-3 my-3">
                <Typography variant="h6" style={{ color: "#0c2461" }}>Personal Data</Typography>
                <TextField label="First Name *" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth className="mb-2" />
                <TextField label="Last Name *" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth className="mb-2" />
                <TextField label="Address *" name="address" value={formData.address} onChange={handleChange} fullWidth className="mb-2" />
                <FormControl fullWidth className="mb-2">
                    <InputLabel>Country *</InputLabel>
                    <Select name="country" value={formData.country} onChange={handleChange}>
                        {countries.map((country) => <MenuItem key={country} value={country}>{country}</MenuItem>)}
                    </Select>
                </FormControl>
                <TextField label="E-mail *" name="email" value={formData.email} onChange={handleChange} fullWidth className="mb-2" />
                <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} fullWidth className="mb-2" />
            </Box>

            {/* Education Section */}
            <Box className="border p-3 my-3">
                <Typography variant="h6" style={{ color: "#0c2461" }}>Education</Typography>
                <TextField label="Bachelor - Year of Completion *" name="bachelorYear" value={formData.bachelorYear} onChange={handleChange} fullWidth className="mb-2" />
            </Box>

            {/* File Uploads */}
            <Box className="border p-3 my-3">
                <Typography variant="h6" style={{ color: "#0c2461" }}>Application Documents</Typography>
                <input type="file" onChange={(e) => handleFileChange(e, "resume")} className="mb-2" />
                {filePreviews.resume && <img src={filePreviews.resume} alt="Preview" className="img-thumbnail" width="100" />}
            </Box>

            <FormControlLabel control={<Checkbox checked={formData.termsAccepted} onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })} />} label="I accept terms of use *" />

            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} className="mt-3">Submit Application</Button>
        </Box>
    );
};

export default ApplicationForm;
