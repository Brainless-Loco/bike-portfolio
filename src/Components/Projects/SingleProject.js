import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React from 'react'

export default function SingleProject({ project, setSelectedProject }) {
    return (
        <Box
            key={project.id}
            sx={{
                p: 3, bgcolor: "#fff", borderRadius: 2, boxShadow: 3, width: "45%", marginBottom: 2,
            }}>
            {/* Project Title */}
            <Typography variant="h6" color='#0c2461' textAlign='justify' fontWeight={600}>{project.title}</Typography>

            {/* Labels */}
            <Box sx={{ mt: 1, mb: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                {project.labels?.map((label, index) => (
                    <Chip key={index} label={label} sx={{ borderRadius: 10, bgcolor: "#1976d2", color: "white" }} />
                ))}
            </Box>

            {/* Short Description */}
            <Typography variant="body2" sx={{ mb: 2, height:'80px', textAlign:'justify' }}>
                {project.shortDescription.length > 100
                    ? `${project.shortDescription.substring(0, 100)}...`
                    : project.shortDescription}
            </Typography>

            {/* Details Button */}
            <Button variant="contained" onClick={() => { setSelectedProject(project) }}>
                Details
            </Button>
        </Box>
    )
}
