import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";


const Advertisement = ({ setData }) => {
    const [advertisement, setAdvertisement] = useState({ source: "", other: "" });

    useEffect(() => {
        setData(advertisement);
    }, [advertisement, setData]);

    return (
        <Box className="border p-3 my-3 bg-white rounded shadow">
            <Typography variant="h6" style={{ color: "#0c2461" }}>Advertisement</Typography>
            <Divider sx={{ marginY: '10px' }} />
            <FormControl fullWidth className="mb-2">
                <InputLabel>How did you find out about this job?</InputLabel>
                <Select value={advertisement.source} onChange={(e) => setAdvertisement({ ...advertisement, source: e.target.value })}>
                    {["LinkedIn", "Facebook", "Google", "Colleague", "Friends", "Website", "Other"].map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            {advertisement.source === "Other" && (
                <TextField label="Specify Other" fullWidth className="mb-2" value={advertisement.other} onChange={(e) => setAdvertisement({ ...advertisement, other: e.target.value })} />
            )}
        </Box>
    );
};

export default Advertisement;
