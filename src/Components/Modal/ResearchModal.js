import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

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
            height: '95vh',
            maxWidth: '90vw',
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
          }}
        >
          {/* Title */}
          <Typography variant="h4" lineHeight={1} color="#0c2461" gutterBottom>
            {research.title}
          </Typography>

          {/* Date */}
          <Typography variant="subtitle1" color="textSecondary">
            {new Date(research.publicationDate?.seconds * 1000).toDateString()}
          </Typography>

          {/* Authors */}
          <Typography variant="body1" sx={{ my: 2 }}>
            {research.authors.map((author, index) => (
              <span key={index}>
                {author.id ? (
                  <Link to={'/Team'} state={{ id: author.id }} >
                    {author.name}
                  </Link>
                ) : (
                  author.name
                )}
                {index < research.authors.length - 1 ? ", " : ""}
              </span>
            ))}
          </Typography>

          <Typography variant="body1" sx={{ my: 2 }}>
            <strong>Journal/Conference:</strong>{" "}
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
          <Box className="ql-editor">
            <div style={{ minHeight: '60%' }} dangerouslySetInnerHTML={{ __html: research.longDescription }} />
          </Box>
          <Box className="text-right">
            <Link to="/Publications">
              <Button variant="contained" sx={{ mt: 2 }} onClick={handleClose}>
                Close
              </Button>
            </Link>
          </Box>

        </Box>
      </Fade>
    </Modal>
  );
};

export default ResearchModal;
