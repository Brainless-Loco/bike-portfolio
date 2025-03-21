import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { db } from "../../Utils/Firebase";
import ResearchModal from "../../Components/Modal/ResearchModal";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import GroupedResearches from "../../Components/Researches/GroupedResearches";

const Researches = ({ setNonHomePath }) => {
  const [groupedResearches, setGroupedResearches] = useState({});
  const [selectedResearch, setSelectedResearch] = useState(null);
  const [open, setOpen] = useState(false);

  const { publicationID } = useParams()

  useEffect(() => {
    setNonHomePath(true)
    const fetchResearches = async () => {
      const q = query(collection(db, "Researches"), orderBy("publicationDate", "desc"));
      onSnapshot(q, (snapshot) => {
        const fetchedResearches = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const grouped = fetchedResearches.reduce((acc, research) => {
          const type = research.publicationType || "Others";
          if (!acc[type]) acc[type] = [];
          acc[type].push(research);
          return acc;
        }, {});
        setGroupedResearches(grouped);
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


  // Open modal with selected research
  // const handleOpen = (research) => {
  //   setSelectedResearch(research);
  //   setOpen(true);
  // };

  // Close modal
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

export default Researches;
