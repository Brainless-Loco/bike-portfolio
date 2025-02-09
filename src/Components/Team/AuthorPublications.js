import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { app } from "../../Utils/Firebase";

const AuthorPublications = ({id}) => {
    const [publications, setPublications] = useState([]);
    const db = getFirestore(app);

    useEffect(() => {
        const fetchPublications = async () => {
            const querySnapshot = await getDocs(collection(db, "Researches"));
            const filteredPublications = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.authors.some((author) => author.id === id)) {
                    filteredPublications.push({ id: doc.id, ...data });
                }
            });

            setPublications(filteredPublications.sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate)));
        };

        fetchPublications();
    }, [id, db]);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={2}>
            {publications.map((publication) => (
                <Card key={publication.id} sx={{ width: "90%", }}>
                    <CardContent>
                        <Typography variant="subtitle1" fontWeight={600} component={Link} to={`/Publications/${publication.id}`} textDecoration="none" color="#0c2461" lineHeight={1} >
                            {publication.title}
                        </Typography>
                        <Typography my={0} py={0} variant="body2" sx={{ color: "gray"}}>
                            {new Date(publication.publicationDate?.seconds * 1000).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                        </Typography>

                        <Typography variant="body2">
                            {publication.authors.map((author, index) => (
                                <React.Fragment key={author.id}>
                                    <Link to={`/Team/${author.id}`} style={{color:'blue', fontWeight: author.id === id ? 700 : "normal"  }} >
                                        {author.name}
                                    </Link>
                                    {index < publication.authors.length - 1 && ", "}
                                </React.Fragment>
                            ))}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default AuthorPublications;
