import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const References = ({ setData }) => {
    const [references, setReferences] = useState([]);

    useEffect(() => {
        setData(references);
    }, [references, setData]);

    const addReference = () => {
        if (references.length < 3) {
            setReferences([...references, null]);
        }
    };

    const handleFileChange = (index, file) => {
        const updatedRefs = [...references];
        updatedRefs[index] = file;
        setReferences(updatedRefs);
    };

    const removeReference = (index) => {
        const updatedRefs = references.filter((_, i) => i !== index);
        setReferences(updatedRefs);
    };

    return (
        <Box className="border p-3 my-3 bg-white rounded shadow">
            <Typography variant="h6" sx={{ color: "#0c2461" }}>
                References (Max 3)
            </Typography>
            <Divider sx={{ marginY: "10px" }} />

            {references.map((ref, index) => (
                <Box key={index} className="mb-3 border p-3 rounded bg-light d-flex align-items-center">
                    <Button variant="contained" component="label">
                        Upload Reference (PDF)
                        <input type="file" hidden accept="application/pdf" onChange={(e) => handleFileChange(index, e.target.files[0])} />
                    </Button>

                    {ref ? (
                        <Box className="d-flex align-items-center ms-3">
                            <CheckCircleIcon color="success" />
                            <Typography variant="body2" className="ms-2">{ref.name}</Typography>
                        </Box>
                    ) : (
                        <Typography variant="body2" color="textSecondary" className="ms-3">
                            No file chosen
                        </Typography>
                    )}

                    {/* Delete Button */}
                    <IconButton color="error" className="ms-3" onClick={() => removeReference(index)}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}

            {/* Add Button Logic */}
            {references.length < 3 && (
                <Button variant="contained" onClick={addReference}>
                    {references.length === 0 ? "Add a Reference" : "Add Another Reference"}
                </Button>
            )}
        </Box>
    );
};

export default References;
