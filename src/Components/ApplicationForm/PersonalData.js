import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const PersonalData = ({ setData }) => {
    const [form, setForm] = useState({ firstName: "", lastName: "", address: "", country: "", email: "", mobile: "" });
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all?fields=name")
            .then(res => res.json())
            .then(data => setCountries(data.map(c => c.name.common)))
            .catch(console.error);
    }, []);

    useEffect(() => { setData(form); }, [form, setData]);

    return (
        <Box className="border p-3 my-3 bg-white rounded shadow">
            <Typography variant="h6" style={{ color: "#0c2461" }}>Personal Data</Typography>
            <Divider sx={{ marginY: '10px' }} />
            <Box className="d-flex flex-wrap justify-content-md-between">
                <TextField label="First Name *" fullWidth className="mb-2 col-12 col-md-5" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                <TextField label="Last Name *" fullWidth className="mb-2 col-12 col-md-5" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
            </Box>
            <TextField label="Present Address *" fullWidth multiline maxRows={3} className="mb-2" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            <FormControl fullWidth className="mb-2">
                <InputLabel>Country *</InputLabel>
                <Select value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}>
                    {countries.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </Select>
            </FormControl>
            <Box className="d-flex flex-wrap justify-content-md-between">
                <TextField label="Mobile *" fullWidth className="mb-2 col-12 col-md-5" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
                <TextField label="E-mail *" fullWidth className="mb-2 col-12 col-md-6" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </Box>
        </Box>
    );
};

export default PersonalData;
