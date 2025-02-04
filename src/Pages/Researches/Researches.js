import React, { useEffect, useState } from "react";
import { collection, getDocs} from "firebase/firestore";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { db } from "../../Utils/Firebase";
import ResearchModal from "../../Components/Modal/ResearchModal";

const Researches = ({setNonHomePath}) => {
  // eslint-disable-next-line
  const [researches, setResearches] = useState([]);
  const [groupedResearches, setGroupedResearches] = useState({});
  const [selectedResearch, setSelectedResearch] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setNonHomePath(true)
    const fetchResearches = async () => {
      const querySnapshot = await getDocs(collection(db, "Researches"));
      const fetchedResearches = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setResearches(fetchedResearches);

      // Grouping by publicationType
      const grouped = fetchedResearches.reduce((acc, research) => {
        const type = research.publicationType || "Others";
        if (!acc[type]) acc[type] = [];
        acc[type].push(research);
        return acc;
      }, {});



      setGroupedResearches(grouped);
    };

    fetchResearches();
  }, [setNonHomePath]);

  // Open modal with selected research
  const handleOpen = (research) => {
    setSelectedResearch(research);
    setOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
    setSelectedResearch(null);
  };

  return (
    <Box sx={{ paddingTop: '100px', paddingX:'5%' }}>
      <Typography variant="h4" sx={{color:'blue'}} gutterBottom>
        Research Publications
      </Typography>

      {Object.entries(groupedResearches).map(([publicationType, items]) => (
        <Box key={publicationType} sx={{ my: 4 }}>
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              pb: 1,
              borderBottom: "2px solid #1976d2",
              display: "inline-block",
              width:'100%'
            }}
          >
            {publicationType}
          </Typography>
            <Box key={publicationType} className={"d-flex flex-wrap"} gap={5}>
                {items.map((research) => (
                    <Card key={research.id} sx={{ mb: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: 3,  width:'31%' }}>
                        <CardContent>
                            <Typography variant="h6">{research.title}</Typography>

                            <Typography variant="subtitle2" color="textSecondary">
                            {new Date(research.publicationDate?.seconds * 1000).toDateString()}
                            </Typography>

                            <Typography variant="body2">
                            {research.authors.map((author, index) => (
                                <span key={index}>
                                {author.profileLink ? (
                                    <a href={author.profileLink} target="_blank" rel="noopener noreferrer">
                                    {author.name}
                                    </a>
                                ) : (
                                    author.name
                                )}
                                {index < research.authors.length - 1 ? ", " : ""}
                                </span>
                            ))}
                            </Typography>

                            {/* <Typography variant="body2" sx={{ mt: 1 }}>
                            {research.longDescription.length > 100
                                ? research.longDescription.substring(0, 100) + "..."
                                : research.longDescription}
                            </Typography> */}

                            <Button variant="outlined" sx={{ mt: 2 }} onClick={() => handleOpen(research)}>
                            Read More
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
      ))}

      {/* Research Modal */}
      <ResearchModal open={open} handleClose={handleClose} research={selectedResearch} />
    </Box>
  );
};

export default Researches;
