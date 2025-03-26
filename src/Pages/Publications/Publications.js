import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { db } from "../../Utils/Firebase";
import ResearchModal from "../../Components/Modal/ResearchModal";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import GroupedResearches from "../../Components/Researches/GroupedResearches";

const Publications = ({ setNonHomePath }) => {
  const [groupedResearches, setGroupedResearches] = useState({});
  const [selectedResearch, setSelectedResearch] = useState(null);
  const [open, setOpen] = useState(false);

  const { publicationID } = useParams()

  useEffect(() => {
    setNonHomePath(true);
    
    const fetchResearches = async () => {
      const q = query(collection(db, "Researches"), orderBy("publicationDate", "desc"));
      
      onSnapshot(q, (snapshot) => {
        const fetchedResearches = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        // Define the fixed order for publication types
        const publicationOrder = ["Book", "Book (Chapters)", "Journal", "Conference", "Others"];
  
        // Group and sort
        const grouped = fetchedResearches.reduce((acc, research) => {
          const type = research.publicationType || "Others";
          if (!acc[type]) acc[type] = [];
          acc[type].push(research);
          return acc;
        }, {});
  
        // Sort groups based on the predefined order
        const sortedGrouped = Object.fromEntries(
          Object.entries(grouped)
            .sort(([a], [b]) => (publicationOrder.indexOf(a) - publicationOrder.indexOf(b)))
        );
  
        setGroupedResearches(sortedGrouped);
      });
    };
  
    fetchResearches();
  }, [setNonHomePath]);
  

  useEffect(() => {
    if (publicationID && groupedResearches) {
      // console.log(publicationID)
      const tempResearches = []
      Object.entries(groupedResearches).forEach(([publicationType, publications]) => {

        tempResearches.push(...publications)
      });
      setSelectedResearch(tempResearches.filter(research => research.id === publicationID)[0])
      setOpen(true)
    }
  }, [publicationID, groupedResearches])

  const handleClose = () => {
    setOpen(false);
    setSelectedResearch(null);
  };

  return (
    <Box sx={{ paddingTop: '100px', paddingX: '5%' }}>
      <Helmet>
        <title>Research Publications | BIKE Lab</title>
        <meta name="description" content="Research publications of the BIKE" />
      </Helmet>
      <Typography variant="h2" sx={{ color: '#0c2461' }} gutterBottom>
        Research Publications
      </Typography>

      {Object.entries(groupedResearches).map(([publicationType, items]) => (
        <GroupedResearches publicationType={publicationType} items={items} />
      ))}

      {/* Research Modal */}
      <ResearchModal open={open} handleClose={handleClose} research={selectedResearch} />
    </Box>
  );
};

export default Publications;
