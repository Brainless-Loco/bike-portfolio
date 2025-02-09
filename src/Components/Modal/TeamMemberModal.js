import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import AuthorGraphVisualization from "../../Pages/AuthorGraph/AuthorGraphVisualization";
import { Link } from "react-router-dom";
import AuthorPublications from "../Team/AuthorPublications";

const TeamMemberModal = ({ open, handleClose, member }) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="team-member-modal">
      <Box
        sx={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)", width: '90vw', height: '90vh',
          overflow: 'auto', bgcolor: "background.paper", borderRadius: 2, boxShadow: 24, p: 4,
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
        <Box sx={{ mt: 1, minHeight: '40%', textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: member.broadDescription }} />

        <Box my={2} minHeight={'200px'} width={'100%'} >
            <Typography variant="h6" fontWeight={600} color="#0c2461" borderBottom={"2px solid #0c2461"}>Publications</Typography>
            <AuthorPublications id={member.id}/>
        </Box>

        {/* <Box my={2} height={'400px'} width={'100%'} border={"1px solid red"}>
          <Typography variant="h6" fontWeight={600} color="#0c2461" borderBottom={"2px solid #0c2461"}>Co Author Graph</Typography>
          <AuthorGraphVisualization />
        </Box> */}
        <Box width={'100%'}>

          <Link to={'/Team'} onClick={handleClose}>
            <Button variant="contained" sx={{ mt: 3, display: "block", mx: "auto" }} >
              Close
            </Button>
          </Link>
        </Box>
      </Box>
    </Modal>
  );
};

export default TeamMemberModal;
