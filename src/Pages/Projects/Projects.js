import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { db } from "../../Utils/Firebase";
import SubtopicsModal from "../../Components/Modal/SubtopicsModal";
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
    setNonHomePath(true)
    fetchTopics();
  }, [setNonHomePath]);

  useEffect(() => {
    if (topic_id && topics) {
      setSelectedTopic(topics.find((topic) => topic.id === topic_id));
      navigate(`/Projects/${topic_id}`);
    }
  }, [topics, topic_id, navigate])


  const handleOpenModal = (topic) => {
    setSelectedTopic(topic);
    navigate(`/Projects/${topic.id}`);
  };

  return (
    <Box sx={{ paddingTop: "100px", paddingX: "5%", pb: '30px' }}>
      <Helmet>
        <title>Projects | BIKE Lab</title>
        <meta name="description" content="See the current Project topics of the BIKE Lab" />
      </Helmet>
      <Typography variant="h2" sx={{ color: "#0c2461" }}>
        Projects of BIKE Lab
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      ) : (
        topics.map((topic) => (
          <Box key={topic.id} mb={3} p={1} >
            <Typography variant="h4" color="#0c2461" pb={1} borderBottom="3px solid #0c2461">
              {topic.topic_title}
            </Typography>
            <Box className="ql-editor" dangerouslySetInnerHTML={{ __html: topic.short_description }} />
            <Button variant="contained" sx={{ mt: 1 }} onClick={() => handleOpenModal(topic)}>
              See Ongoing Projects
            </Button>
          </Box>
        ))
      )}

      {selectedTopic && <SubtopicsModal topic={selectedTopic} onClose={() => setSelectedTopic(null)} />}
    </Box>
  );
};

export default Projects;
