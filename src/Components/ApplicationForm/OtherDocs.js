import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const OtherDocs = ({ setData }) => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        setData(documents);
    }, [documents, setData]);

    const addDocument = () => {
        if (documents.length < 3) {
            setDocuments([...documents, { title: "", file: null }]);
        }
    };

    const handleChange = (index, field, value) => {
        const updatedDocs = [...documents];
        updatedDocs[index][field] = value;
        setDocuments(updatedDocs);
    };

    const removeDocument = (index) => {
        const updatedDocs = documents.filter((_, i) => i !== index);
        setDocuments(updatedDocs);
    };

    return (
        <Box className="border p-3 my-3 bg-white rounded shadow">
            <Typography variant="h6" sx={{ color: "#0c2461" }}>
                Other Documents (if applicable) {documents.length >= 3 && "(Max 3)"}
            </Typography>
            <Divider sx={{ marginY: "10px" }} />

            {documents.map((doc, index) => (
                <Box key={index} className="mb-3 border p-3 rounded bg-light">
                    <TextField
                        label="Document Title"
                        fullWidth
                        className="mb-2"
                        value={doc.title}
                        onChange={(e) => handleChange(index, "title", e.target.value)}
                    />

                    <Box className="d-flex align-items-center">
                        <Button variant="contained" component="label">
                            Upload File (PDF)
                            <input
                                type="file"
                                hidden
                                accept="application/pdf"
                                onChange={(e) => handleChange(index, "file", e.target.files[0])}
                            />
                        </Button>

                        {doc.file ? (
                            <Box className="d-flex align-items-center ms-3">
                                <CheckCircleIcon color="success" />
                                <Typography variant="body2" className="ms-2">
                                    {doc.file.name}
                                </Typography>
                            </Box>
                        ) : (
                            <Typography variant="body2" color="textSecondary" className="ms-3">
                                No file chosen
                            </Typography>
                        )}

                        {/* Delete Button */}
                        <IconButton color="error" fullwi className="ml-auto" onClick={() => removeDocument(index)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
            ))}

            {/* Add Button Logic */}
            {documents.length < 3 && (
                <Button variant="contained" onClick={addDocument}>
                    {documents.length === 0 ? "Add a Document" : "Add Another Document"}
                </Button>
            )}
        </Box>
    );
};

export default OtherDocs;
