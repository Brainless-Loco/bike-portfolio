import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const SubtopicsModal = ({ topic, onClose }) => {
    const navigate = useNavigate()

    const handleCLose = () => {
        onClose();
        navigate('/projects');
    }
    return (
        <Modal open={true} onClose={handleCLose}>
            {/* Close Button removed */}

            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "85%",
                    height: "90vh",
                    bgcolor: "white",
                    boxShadow: 24,
                    p: 3,
                    overflowY: "auto",
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h3" color="#0c2461" lineHeight={1}>
                        {topic.topic_title}
                    </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />

                {/* Description */}
                <Box className="ql-editor" height={'auto'} dangerouslySetInnerHTML={{ __html: topic.short_description }} />

                {/* Close Button */}
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Button variant="contained" onClick={handleCLose}>
                        Close
                    </Button>
                </Box>

            </Box>
        </Modal>
    );
};

export default SubtopicsModal;
