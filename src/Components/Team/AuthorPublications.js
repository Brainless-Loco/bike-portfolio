import React, { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { app } from "../../Utils/Firebase";
import SinglePublication from "./SinglePublication";
import Button from "@mui/material/Button";

const AuthorPublications = ({ id }) => {
    const [publications, setPublications] = useState([]);
    const [visibleCount, setVisibleCount] = useState(3);
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

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 5);
    };

    if (publications.length < 1) {
        return (
            <Box display="flex" justifyContent="center" my={4}>
                <Typography variant="h6" color="textSecondary">No publications found for this author.</Typography>
            </Box>
        )
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={2}>
            {publications.slice(0, visibleCount).map((publication, index) => (
                <SinglePublication key={index} publication={publication} id={id} />
            ))}
            {visibleCount < publications.length && (
                <Box textAlign="center" mt={2}>
                    <Button variant="outlined" sx={{ borderColor: '#0c2461', color: '#0c2461' }} onClick={handleLoadMore}>
                        Load More
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default AuthorPublications;
