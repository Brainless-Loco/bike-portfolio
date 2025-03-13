import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const Publications = ({ setData }) => {
    const [publications, setPublications] = useState([]);

    useEffect(() => {
        setData(publications);
    }, [publications, setData]);

    const addPublication = () => {
        if (publications.length < 5) {
            setPublications([...publications, { title: "", coAuthorStatement: null, file: null }]);
        }
    };

    const handleChange = (index, field, value) => {
        const updatedPubs = [...publications];
        updatedPubs[index][field] = value;
        setPublications(updatedPubs);
    };

    const removePublication = (index) => {
        setPublications(publications.filter((_, i) => i !== index));
    };

    return (
        <Box className="border p-3 my-3 bg-white rounded shadow">
            <Typography variant="h6" sx={{ color: "#0c2461" }}>
                Publications (Max 5)
            </Typography>
            <Divider sx={{ marginY: "10px" }} />

            {publications.map((pub, index) => (
                <Box key={index} className="mb-3 border p-3 rounded bg-light">
                    {/* Title Input */}
                    <TextField
                        label="Publication Title"
                        fullWidth
                        className="mb-2"
                        value={pub.title}
                        onChange={(e) => handleChange(index, "title", e.target.value)}
                    />

                    {/* Publication File Upload */}
                    <Box className="d-flex align-items-center mb-2">
                        <Button variant="contained" component="label">
                            Upload Publication (PDF)
                            <input type="file" hidden accept="application/pdf" onChange={(e) => handleChange(index, "file", e.target.files[0])} />
                        </Button>
                        {pub.file ? (
                            <Box className="d-flex align-items-center ms-3">
                                <CheckCircleIcon color="success" />
                                <Typography variant="body2" className="ms-2">{pub.file.name}</Typography>
                            </Box>
                        ) : (
                            <Typography variant="body2" color="textSecondary" className="ms-3">
                                No file chosen
                            </Typography>
                        )}
                    </Box>

                    {/* Co-Author Statement Upload */}
                    <Box className="d-flex align-items-center">
                        <Button variant="contained" component="label">
                            Upload Co-Author Statement (PDF)
                            <input type="file" hidden accept="application/pdf" onChange={(e) => handleChange(index, "coAuthorStatement", e.target.files[0])} />
                        </Button>
                        {pub.coAuthorStatement ? (
                            <Box className="d-flex align-items-center ms-3">
                                <CheckCircleIcon color="success" />
                                <Typography variant="body2" className="ms-2">{pub.coAuthorStatement.name}</Typography>
                            </Box>
                        ) : (
                            <Typography variant="body2" color="textSecondary" className="ms-3">
                                No file chosen
                            </Typography>
                        )}
                    </Box>

                    {/* Delete Button */}
                    <IconButton color="error" className="ms-3 mt-2" onClick={() => removePublication(index)}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}

            {/* Add Button Logic */}
            {publications.length < 5 && (
                <Button variant="contained" onClick={addPublication}>
                    {publications.length === 0 ? "Add a Publication" : "Add Another Publication"}
                </Button>
            )}
        </Box>
    );
};

export default Publications;
