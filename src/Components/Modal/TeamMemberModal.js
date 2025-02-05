import { Modal, Box, Typography, Avatar, Button } from "@mui/material";

const TeamMemberModal = ({ open, handleClose, member }) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="team-member-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: '90vw',
          height: '90vh',
          overflow: 'auto',
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Avatar src={member.profilePhoto} alt={member.name} sx={{ width: 100, height: 100, mx: "auto", mb: 1, '& img': { objectFit: 'contain' }, border: '1px solid #0c2461' }} />
          <Typography variant="h6" color="#0c2461" fontWeight={600}>{member.name}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {member.position}
          </Typography>
        </Box>

        <Typography variant="body1">
          <strong>Education:</strong> {member.educationLevel}
        </Typography>

        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Description:</strong>
        </Typography>
        <Box sx={{ mt: 1, minHeight: '60%', textAlign:'justify' }} dangerouslySetInnerHTML={{ __html: member.broadDescription }} />

        <Button variant="contained" sx={{ mt: 3, display: "block", mx: "auto" }} onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default TeamMemberModal;
