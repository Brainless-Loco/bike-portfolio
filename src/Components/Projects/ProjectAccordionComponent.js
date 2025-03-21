import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const ProjectAccordionComponent = ({ topic, handleOpenModal }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded((prev) => !prev)}
      sx={{
        mb: 3, // Ensures spacing between accordions
        boxShadow: 3,
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
      </AccordionSummary>

      <AccordionDetails>
        {/* Associated Members */}
        {topic.associated_members && topic.associated_members.length > 0 && (
          <Typography variant="h5" sx={{ mb: 1, fontWeight: "600" }}>
            Associated Members:{" "}
            {topic.associated_members.map((member, index) => (
              <Link
                key={member.id}
                to={`/Team/${member.id}`}
                style={{ textDecoration: "none", }}
              >
                {member.name}
                {index !== topic.associated_members.length - 1 && ", "}
              </Link>
            ))}
          </Typography>
        )}

        {/* Description */}
        <Box className="ql-editor" dangerouslySetInnerHTML={{ __html: topic.short_description }} />

        {/* Button */}
        <Box mt={2} textAlign={'center'}>
          <button style={{height:'8vh', width:'50%', backgroundColor:'#0c2461'}} className="btn btn-primary" onClick={() => handleOpenModal(topic)}>
            See Ongoing Projects
          </button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default ProjectAccordionComponent;
