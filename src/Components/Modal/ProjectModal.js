import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function ProjectModal({ open, handleClose, project }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          bgcolor: "white",
          p: 3,
          width: "90vw",
          height: "95vh",
          overflowY: "auto",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        {/* Project Title */}
        <Typography variant="h4" lineHeight={1} sx={{ fontWeight: "bold", mb: 2, color: '#0c2461' }}>
          {project.title}
        </Typography>

        {/* Labels */}
        <Box sx={{ mb: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
          {project.labels?.map((label, index) => (
            <Chip key={index} label={label} sx={{ borderRadius: 10, bgcolor: "#1976d2", color: "white" }} />
          ))}
        </Box>

        {/* Broad Description (HTML) */}
        <Box className="ql-editor">
          <Typography
            variant="body1"
            component="div"
            sx={{ mb: 2, height: "55%" }}
            dangerouslySetInnerHTML={{ __html: project.broadDescription }}
          />
        </Box>
        {/* External Links */}
        {project.externalLinks?.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Know More</Typography>
            {project.externalLinks.map((link, index) => (
              <Button
                key={index}
                variant="contained"
                sx={{ mt: 1, borderRadius: 10, mr: 1 }}
                href={link.url}
                target="_blank"
              >
                {link.title}
              </Button>
            ))}
          </Box>
        )}

        {/* Close Button */}
        <Box className="text-right" sx={{ mt: 3 }}>
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
