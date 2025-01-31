import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ResearchModal = ({ open, handleClose, research }) => {
  if (!research) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            height:'95vh',
            maxWidth:'90vw',
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
          }}
        >
          <Typography variant="h4" gutterBottom>
            {research.title}
          </Typography>

          <Typography variant="subtitle1" color="textSecondary">
            {new Date(research.publicationDate?.seconds * 1000).toDateString()}
          </Typography>

          <Typography variant="body1" sx={{ my:2 }}>
            {research.authors.map((author, index) => (
              <span key={index}>
                {author.profileLink ? (
                  <a href={author.profileLink} target="_blank" rel="noopener noreferrer">
                    {author.name}
                  </a>
                ) : (
                  author.name
                )}
                {index < research.authors.length - 1 ? ", " : ""}
              </span>
            ))}
          </Typography>

          <Typography variant="body1" sx={{ my: 2 }}>
            <strong>Publisher:</strong>{" "}
            {research.publisher?.externalLink ? (
              <a
                href={research.publisher.externalLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {research.publisher.title}
              </a>
            ) : (
              research.publisher?.title
            )}
          </Typography>

          <div style={{minHeight:'60%'}} dangerouslySetInnerHTML={{ __html: research.longDescription }} />
            <Box className="text-right">
                    <Button variant="contained" sx={{ mt: 2 }} onClick={handleClose}>
                    Close
                </Button>
            </Box>
          
        </Box>
      </Fade>
    </Modal>
  );
};

export default ResearchModal;
