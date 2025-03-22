import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const SubtopicsModal = ({ topic, onClose }) => {
    const navigate = useNavigate()
    return (
        <Modal open={true} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "90vw",
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
                    <IconButton onClick={onClose}>
                        <CloseIcon button onClick={()=>{
                            navigate(`/Projects`)
                        }} />
                    </IconButton>
                </Box>
                <Divider sx={{ my: 2 }} />

                {/* Description */}
                <Box className="ql-editor" height={'auto'} dangerouslySetInnerHTML={{ __html: topic.short_description }} />

            </Box>
        </Modal>
    );
};

export default SubtopicsModal;
