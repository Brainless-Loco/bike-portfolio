import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const Education = ({ setData }) => {
    const [educationList, setEducationList] = useState([]);

    useEffect(() => {
        // Filter out incomplete entries before sending to Firebase
        const validEducation = educationList.filter(
            (edu) => edu.degree && edu.university && edu.year_of_passing
        );
        setData(validEducation);
    }, [educationList, setData]);

    const addEducation = () => {
        setEducationList([...educationList, { degree: "", university: "", year_of_passing: "", document: null }]);
    };

    const handleChange = (index, field, value) => {
        const updatedList = [...educationList];
        updatedList[index][field] = value;
        setEducationList(updatedList);
    };

    const handleDelete = (index) => {
        const updatedList = educationList.filter((_, i) => i !== index);
        setEducationList(updatedList);
    };

    return (
        <Box className="border p-3 my-3 bg-white rounded shadow">
            <Typography variant="h6" sx={{ color: "#0c2461" }}>Education</Typography>
            <Divider sx={{ marginY: "10px" }} />

            {educationList.map((edu, index) => (
                <Box key={index} className="mb-3 p-2 border bg-light rounded  d-flex justify-content-between flex-wrap">
                    <TextField
                        label="Degree"
                        className="mb-2 col-12 col-md-4"
                        value={edu.degree}
                        onChange={(e) => handleChange(index, "degree", e.target.value)}
                    />
                    <TextField
                        label="University"
                        className="mb-2 col-12 col-md-4"
                        value={edu.university}
                        onChange={(e) => handleChange(index, "university", e.target.value)}
                    />
                    <TextField
                        label="Year of Passing"
                        type="number"
                        className="mb-2 col-12 col-md-2"
                        value={edu.year_of_passing}
                        onChange={(e) => handleChange(index, "year_of_passing", e.target.value)}
                    />
                    <IconButton onClick={() => handleDelete(index)} color="error">
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}

            <Button variant="contained" onClick={addEducation}>
                {educationList.length === 0 ? "Add a Degree" : "Add Another Degree"}
            </Button>
        </Box>
    );
};

export default Education;
