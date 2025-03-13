import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider";


const JobHistory = ({ setData }) => {
    const [job, setJob] = useState({ workplace: "", occupation: "" });

    useEffect(() => {
        setData(job);
    }, [job, setData]);

    return (
        <Box className="border p-3 my-3 bg-white rounded shadow">
            <Typography variant="h6" style={{ color: "#0c2461" }}>Job History</Typography>
            <Divider sx={{ marginY: '10px' }} />
            <TextField label="Latest Workplace" fullWidth className="mb-2" value={job.workplace} onChange={(e) => setJob({ ...job, workplace: e.target.value })} />
            <TextField label="Latest Occupation" fullWidth className="mb-2" value={job.occupation} onChange={(e) => setJob({ ...job, occupation: e.target.value })} />
        </Box>
    );
};

export default JobHistory;
