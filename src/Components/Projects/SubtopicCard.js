import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import React from "react";

const SubtopicCard = ({ subtopic, topicId }) => {
    return (
        <Link
            to={`/Projects/${topicId}/subtopics/${subtopic.id}`}
            key={subtopic.id}
            style={{
                marginBottom: 10, display: "flex", justifyContent: "center", alignItems: "center", width: "100%", textDecoration: "none",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
            className=" rounded border"
        >
            <ListItem sx={{ textDecoration: "none !important" }}>
                <ListItemIcon>
                    <RadioButtonCheckedIcon sx={{ color: "#0c2461", fontSize: "50px", marginRight: "5px" }} />
                </ListItemIcon>
                <ListItemText
                    primary={
                        <Link to={`/Projects/${topicId}/subtopics/${subtopic.id}`} style={{ color: "#0c2461", fontSize: "20px", textDecoration: "none" }}>
                            {subtopic.subtopic_title}
                        </Link>
                    }
                    secondary={
                        subtopic.associated_members?.length > 0 && (
                            <span>
                                {subtopic.associated_members.map((member, idx) => (
                                    <React.Fragment key={member.id}>
                                        {idx > 0 && ", "}
                                        <Link
                                            to={`/Team/${member.id}`}
                                            style={{ textDecoration: "none", marginRight: "5px", fontSize: "17px" }}
                                        >
                                            {member.name}
                                        </Link>
                                    </React.Fragment>
                                ))}
                            </span>
                        )
                    }
                />
            </ListItem>
        </Link>
    );
};

export default SubtopicCard;
