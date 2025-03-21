import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { db } from "../../Utils/Firebase";
import SubtopicCard from "../Projects/SubtopicCard";

const SubtopicsModal = ({ topic, onClose }) => {
    const { topic_id } = useParams(); // Get the topic ID from the URL
    const [subtopics, setSubtopics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubtopics = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, `Projects/${topic_id || topic.id}/SubTopics`));
                const subtopicData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                
                subtopicData.map((subtopic) => (subtopic.serial = parseInt(subtopic.serial)));

                subtopicData.sort((a, b) =>
                    a.serial.toString().localeCompare(b.serial.toString())
                );
                setSubtopics(subtopicData);
            } catch (error) {
                console.error("Error fetching subtopics:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubtopics();
    }, [topic_id, topic.id]);

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
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider sx={{ my: 2 }} />

                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="80%">
                        <CircularProgress />
                    </Box>
                ) : (
                    <List>
                        {subtopics.map((subtopic) => (
                            <SubtopicCard subtopic={subtopic} topicId={topic_id??topic.id}/>
                        ))}
                    </List>
                )}
            </Box>
        </Modal>
    );
};

export default SubtopicsModal;
