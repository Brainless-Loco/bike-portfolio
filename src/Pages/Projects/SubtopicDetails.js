import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { db } from "../../Utils/Firebase";
import { Helmet } from "react-helmet";

const SubtopicDetails = ({ setNonHomePath }) => {
    const { topic_id, subtopic_id } = useParams();
    const [subtopic, setSubtopic] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubtopic = async () => {
            try {
                const subtopicRef = doc(db, `Projects/${topic_id}/SubTopics`, subtopic_id);
                const subtopicSnap = await getDoc(subtopicRef);

                if (subtopicSnap.exists()) {
                    setSubtopic(subtopicSnap.data());
                } else {
                    console.error("Subtopic not found");
                }
            } catch (error) {
                console.error("Error fetching subtopic:", error);
            } finally {
                setLoading(false);
            }
        };
        setNonHomePath(true)
        fetchSubtopic();
    }, [topic_id, subtopic_id, setNonHomePath]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!subtopic) {
        return (
            <Box textAlign="center" mt={5} minHeight="90vh">
                <Typography variant="h5" color="error">
                    Subtopic Not Found
                </Typography>
            </Box>
        );
    }

    return (
        <Box className="px-md-5 px-1" pt={13} pb={15} >
            <Helmet>
                <title>{subtopic.subtopic_title} | BIKE Lab</title>
                <meta name="description" content="See the current Project topics of the BIKE Lab" />
            </Helmet>
            {/* Subtopic Title */}
            <Typography variant="h2" color="#0c2461" lineHeight={1} gutterBottom>
                {subtopic.subtopic_title}
            </Typography>

            {/* Associated Members */}
            {subtopic.associated_members?.length > 0 && (
                <Typography sx={{ mb: 2, fontSize: '22px' }}>
                    <strong>Associated Members: </strong>
                    {subtopic.associated_members.map((member, index) => (
                        <span key={member.id}>
                            <Link to={`/Team/${member.id}`} style={{ textDecoration: "none", color: "#0c2461" }}>
                                {member.name}
                            </Link>
                            {index < subtopic.associated_members.length - 1 ? ", " : ""}
                        </span>
                    ))}
                </Typography>
            )}

            {/* Description */}
            <Box className="ql-editor" dangerouslySetInnerHTML={{ __html: subtopic.description }} />
        </Box>
    );
};

export default SubtopicDetails;
