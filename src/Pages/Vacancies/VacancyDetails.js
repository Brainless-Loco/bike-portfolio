import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { db } from "../../Utils/Firebase";
import SectionTitle from "../../Components/Vacancy/SectionTitle";

export default function VacancyDetails({ setNonHomePath }) {
    const { id } = useParams(); // Get the vacancy ID from URL
    const [vacancy, setVacancy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchVacancy = async () => {
            try {
                const docRef = doc(db, "Vacancies", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setVacancy(docSnap.data());
                } else {
                    setError("Vacancy not found.");
                }
            } catch (err) {
                setError("Failed to fetch vacancy details.");
            } finally {
                setLoading(false);
            }
        };
        setNonHomePath(true)
        fetchVacancy();
    }, [id, setNonHomePath]);

    // Function to format date & time
    const formatDateTime = (timestamp) => {
        if (!timestamp || !timestamp.seconds) return "N/A"; // Handle missing values

        // Convert Firestore Timestamp to JavaScript Date
        const date = new Date(timestamp.seconds * 1000);

        return date.toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };


    if (loading) {
        return (
            <Box className="d-flex justify-content-center mt-5 pt-5">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box className="container mt-5 pt-5">
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box className="container mt-5 py-5">
            {/* Vacancy Title */}
            <Typography variant="h2" color="#0c2461" fontWeight="bold" className="text-center mb-4">
                {vacancy.position_name}
            </Typography>
            {/* Vacancy Details */}
            <Box className="bg-light p-4 rounded shadow-sm">
                {/* Application Deadline */}
                <Typography className="my-2" fontWeight={"bold"}>Application Deadline: {formatDateTime(vacancy.application_deadline)}</Typography>
                <Typography className="mb-3" fontWeight={"bold"}>  Total Vacancy: {vacancy.total_vacancy}</Typography>
                <Divider />

                {/* Short Description */}
                <SectionTitle title={"Overview"} />
                <Typography className="my-3">{vacancy.short_description}</Typography>

                {/* Requirements (HTML Rendered) */}
                <SectionTitle title={"Requirements"} />
                <Box className="ql-editor">

                    <Typography className="mb-3" dangerouslySetInnerHTML={{ __html: vacancy.requirements }} />
                </Box>

                {/* Broad Description (HTML Rendered) */}
                <SectionTitle title="Description" />

                <Box className="ql-editor">
                    <Typography dangerouslySetInnerHTML={{ __html: vacancy.broad_description }} />
                </Box>
            </Box>

            {/* Apply Button */}
            <Box className="d-flex justify-content-center mt-4">
                <Button
                    component={Link}
                    to={`/Apply/${id}`}
                    variant="contained"
                    color="primary"
                    size="large"
                    className="fw-bold"
                >
                    Apply at this Position
                </Button>
            </Box>
        </Box>
    );
}
