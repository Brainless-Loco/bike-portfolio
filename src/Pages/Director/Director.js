import { useState, useEffect } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import { app } from "../../Utils/Firebase";

const Director = ({setNonHomePath}) => {
  const [description, setDescription] = useState("");

  const db = getFirestore(app)

  useEffect(() => {
    const fetchDescription = async () => {
      const docRef = doc(db, "BasicInfo", "director-info");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDescription(docSnap.data().description); // Set HTML content
      }
    };
    setNonHomePath(true)
    fetchDescription();
    // eslint-disable-next-line
  }, [setNonHomePath]);

  return (
    <Box paddingX={3} paddingY={15}>
      <Typography variant="h3" color="#0c2461" gutterBottom>
        Director of BIKE Lab
      </Typography>
      <Box dangerouslySetInnerHTML={{ __html: description }} />
    </Box>
  );
};

export default Director;
