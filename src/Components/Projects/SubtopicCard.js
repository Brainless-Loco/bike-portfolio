import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

const SubtopicCard = ({ subtopic, topicId }) => {
    return (
        <Link
            to={`/Projects/${topicId}/subtopics/${subtopic.id}`}
            key={subtopic.id}
            style={{ marginBottom: 3, display: "flex", justifyContent: "center", alignItems: "center", width: "100%", textDecoration: "none" }}
            className="shadow rounded border"
        >
            <ListItem sx={{ textDecoration: "none !important" }}>
                <ListItemIcon>
                    <RadioButtonCheckedIcon sx={{ color: "#0c2461", fontSize: "50px", marginRight: "5px" }} />
                </ListItemIcon>
                <ListItemText
                    primary={
                        <Link to={`/Projects/${topicId}/subtopics/${subtopic.id}`} style={{ color: "#0c2461", fontSize: "30px", textDecoration: "none" }}>
                            {subtopic.subtopic_title}
                        </Link>
                    }
                    secondary={
                        subtopic.associated_members?.length > 0 &&
                        subtopic.associated_members.map((member, idx) => (
                            <span key={member.id}>
                                {idx > 0 && " | "}
                                <Link to={`/Team/${member.id}`} style={{ textDecoration: "none", marginRight: "10px", fontSize: "20px" }}>
                                    {member.name}
                                </Link>
                            </span>
                        ))
                    }
                />
            </ListItem>
        </Link>
    );
};

export default SubtopicCard;
