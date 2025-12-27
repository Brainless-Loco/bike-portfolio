import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Utils/Firebase";
import SubtopicsModal from "../../Components/Modal/SubtopicsModal";
import ProjectAccordionComponent from "../../Components/Projects/ProjectAccordionComponent";
import { Helmet } from "react-helmet";

const Projects = ({ setNonHomePath }) => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { topic_id } = useParams();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Projects"));
        const topicData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTopics(topicData);
      } catch (error) {
        console.error("Error fetching topics:", error);
      } finally {
        setLoading(false);
      }
    };
    setNonHomePath(true);
    fetchTopics();
  }, [setNonHomePath]);

  useEffect(() => {
    if (topic_id && topics) {
      setSelectedTopic(topics.find((topic) => topic.id === topic_id));
      navigate(`/projects/${topic_id}`);
    }
  }, [topics, topic_id, navigate]);

  const handleOpenModal = (topic) => {
    setSelectedTopic(topic);
    navigate(`/projects/${topic.id}`);
  };

  return (
    <Box sx={{ paddingTop: "110px", paddingX: "5%", pb: "30px",minHeight:'85vh' }}>
      <Helmet>
        <title>Projects | BIKE Lab</title>
        <meta name="description" content="See the current Project topics of the BIKE Lab" />
      </Helmet>

      <Typography variant="h2" sx={{ color: "#0c2461", mb: 2, fontSize: { xs: '24px', sm: '32px', md: '40px', lg: '56px' } }}>
        Projects of BIKE Lab
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      ) : (
        topics.map((topic) => (
          <ProjectAccordionComponent key={topic.id} topic={topic} handleOpenModal={handleOpenModal} />
        ))
      )}

      {selectedTopic && <SubtopicsModal topic={selectedTopic} onClose={() => setSelectedTopic(null)} />}
    </Box>
  );
};

export default Projects;
