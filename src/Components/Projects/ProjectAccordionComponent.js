import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import { getDocs, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import SubtopicCard from "./SubtopicCard";
import { db } from "../../Utils/Firebase";

const ProjectAccordionComponent = ({ topic, handleOpenModal }) => {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subtopics, setSubtopics] = useState([]);

  useEffect(() => {
    if (!expanded) return; // Only fetch data when expanded

    const fetchSubtopics = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, `Projects/${topic.id}/SubTopics`));
        const subtopicData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        subtopicData.forEach((subtopic) => (subtopic.serial = parseInt(subtopic.serial)));
        subtopicData.sort((a, b) => a.serial - b.serial);

        setSubtopics(subtopicData);
      } catch (error) {
        console.error("Error fetching subtopics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubtopics();
  }, [expanded, topic.id]);

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded((prev) => !prev)}
      sx={{
        mb: 3,
        boxShadow: 1, // Smaller box shadow
        "&:before": { display: "none" }, // Removes focus outline
        "&.Mui-expanded": { marginBottom: "16px" }, // Ensures spacing even when expanded
      }}
    >
      <AccordionSummary
        expandIcon={
          <IconButton sx={{ ml: "auto" }}> {/* Keeps icon at right-most position */}
            <ExpandMoreIcon sx={{ fontSize: "50px" }} />
          </IconButton>
        }
        sx={{
          backgroundColor: "white",
          borderBottom: "4px solid #0c2461",
          "& .MuiAccordionSummary-content": {
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          },
          "&:focus": { outline: "none" }, // Removes black border focus
        }}
      >
        <Typography variant="h4" color="#0c2461" lineHeight={1}>
          {topic.topic_title}
        </Typography>

        {/* Info Button */}
        <IconButton sx={{ ml: 2 }}>
          <InfoOutlinedIcon onClick={(e) => {

            e.stopPropagation();
            handleOpenModal(topic)
          }} sx={{ fontSize: 30, color: "#0c2461" }} />
        </IconButton>
      </AccordionSummary>

      <AccordionDetails>
        {/* Associated Members */}
        {topic.associated_members && topic.associated_members.length > 0 && (
          <Typography variant="h5" sx={{ mb: 1, fontWeight: "600" }}>
            Associated Members:{" "}
            {topic.associated_members.map((member, index) => (
              <Link key={member.id} to={`/Team/${member.id}`} style={{ textDecoration: "none" }}>
                {member.name}
                {index !== topic.associated_members.length - 1 && ", "}
              </Link>
            ))}
          </Typography>
        )}

        {/* Subtopics List */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="80%">
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {subtopics.map((subtopic) => (
              <SubtopicCard key={subtopic.id} subtopic={subtopic} topicId={topic.id} />
            ))}
          </List>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default ProjectAccordionComponent;
