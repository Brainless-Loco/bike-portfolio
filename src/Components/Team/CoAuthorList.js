import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { db } from "../../Utils/Firebase";
import { doc, getDoc } from "firebase/firestore";

const CoAuthorList = ({ id }) => {
    const [coAuthors, setCoAuthors] = useState([]);

    const fetchAuthorById = async (id) => {
        try {
            const docRef = doc(db, "AuthorGraph", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data().coAuthors || [];
            } else {
                console.error("No such document!");
                return [];
            }
        } catch (error) {
            console.error("Error fetching author data:", error);
            return [];
        }
    };


    useEffect(() => {
        const loadCoAuthors = async () => {
            const authors = await fetchAuthorById(id);
            setCoAuthors(authors.sort((a, b) => a.name.localeCompare(b.name)));
        };
        loadCoAuthors();
    }, [id]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h6" fontWeight={600} color="#0c2461" borderBottom={"2px solid #0c2461"}>Co Authors</Typography>
            {coAuthors.map((coAuthor) => (
                <Box key={coAuthor.id} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar sx={{width:'50px', height:'50px', border:'2px solid #0c2461'}} src={coAuthor.profilePhoto} alt={coAuthor.name} />
                    <Link
                        to={"/Team/"+coAuthor.id}
                        state={{ id: coAuthor.id }}
                    >
                        <Typography 
                        sx={{ textDecoration: "none", fontSize: "1.1rem", fontWeight: 600 }}>{coAuthor.name}</Typography>
                    </Link>
                </Box>
            ))}
        </Box>
    );
};

export default CoAuthorList;
