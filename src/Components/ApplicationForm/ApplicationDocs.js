import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ApplicationDocs = ({ setData }) => {
    const [docs, setDocs] = useState({ motivationLetter: null, cv: null, cover_letter: null });

    useEffect(() => {
        setData(docs);
    }, [docs, setData]);

    const handleFileChange = (e, key) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            setDocs({ ...docs, [key]: file });
        } else {
            alert("Only PDFs are allowed.");
        }
    };

    return (
        <Box className="border p-3 my-3 bg-white rounded shadow">
            <Typography variant="h6" sx={{ color: "#0c2461" }}>Application Documents</Typography>
            <Divider sx={{ marginY: "10px" }} />

            {/* Increased spacing between components using Bootstrap classes */}
            <Box className="d-flex flex-column">
                {/* Motivation Letter Upload */}
                <Box className="d-flex align-items-center mb-3">
                    <Button variant="contained" component="label">
                        Upload Motivation Letter (PDF)
                        <input type="file" hidden accept="application/pdf" onChange={(e) => handleFileChange(e, "motivationLetter")} />
                    </Button>
                    {docs.motivationLetter ? (
                        <Box className="d-flex align-items-center ms-3">
                            <CheckCircleIcon color="success" />
                            <Typography variant="body2" className="ms-2">{docs.motivationLetter.name}</Typography>
                        </Box>
                    ) : (
                        <Typography variant="body2" color="textSecondary" className="ms-3">No file chosen</Typography>
                    )}
                </Box>

                {/* CV Upload */}
                <Box className="d-flex align-items-center mb-3">
                    <Button variant="contained" component="label">
                        Upload CV (PDF)
                        <input type="file" hidden accept="application/pdf" onChange={(e) => handleFileChange(e, "cv")} />
                    </Button>
                    {docs.cv ? (
                        <Box className="d-flex align-items-center ms-3">
                            <CheckCircleIcon color="success" />
                            <Typography variant="body2" className="ms-2">{docs.cv.name}</Typography>
                        </Box>
                    ) : (
                        <Typography variant="body2" color="textSecondary" className="ms-3">No file chosen</Typography>
                    )}
                </Box>

                {/* Cover Letter Upload */}
                <Box className="d-flex align-items-center mb-3">
                    <Button variant="contained" component="label">
                        Upload Cover Letter (PDF)
                        <input type="file" hidden accept="application/pdf" onChange={(e) => handleFileChange(e, "cover_letter")} />
                    </Button>
                    {docs.cover_letter ? (
                        <Box className="d-flex align-items-center ms-3">
                            <CheckCircleIcon color="success" />
                            <Typography variant="body2" className="ms-2">{docs.cover_letter.name}</Typography>
                        </Box>
                    ) : (
                        <Typography variant="body2" color="textSecondary" className="ms-3">No file chosen</Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default ApplicationDocs;
