import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { db } from "../../Utils/Firebase";
import ResearchModal from "../../Components/Modal/ResearchModal";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Researches = ({ setNonHomePath }) => {
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
    <Box sx={{ paddingTop: '100px', paddingX: '5%' }}>
      <Helmet>
        <title>Research Publications | BIKE Lab</title>
        <meta name="description" content="Research publications of the BIKE" />
      </Helmet>
      <Typography variant="h4" sx={{ color: 'blue' }} gutterBottom>
        Research Publications
      </Typography>

      {Object.entries(groupedResearches).map(([publicationType, items]) => (
        <Box key={publicationType} sx={{ my: 4 }}>
          <Typography
            variant="h5"
            sx={{ mb: 2, pb: 1, borderBottom: "2px solid #1976d2", display: "inline-block", width: '100%'
            }}
          >
            {publicationType}
          </Typography>
          <Box key={publicationType} className={"d-flex flex-wrap"} gap={5}>
            {/* {items.map((research) => (
              <Card key={research.id} sx={{ mb: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: 3, width: '31%' }}>
                <CardContent>
                  <Typography variant="h6" color="#0c2461" fontWeight={600}>{research.title}</Typography>

                  <Typography variant="subtitle2" color="textSecondary">
                    {new Date(research.publicationDate?.seconds * 1000).toDateString()}
                  </Typography>

                  <Typography variant="body2">
                    {research.authors.map((author, index) => (
                      <span key={index}>
                        {author.id ? (
                          <Link  to={'/Team'} state={{id:author.id}} >
                            {author.name}
                          </Link>
                        ) : (
                          author.name
                        )}
                        {index < research.authors.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </Typography>
                  <Button variant="outlined" sx={{ mt: 2 }} onClick={() => handleOpen(research)}>
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))} */}
            <Typography variant="h5">To be updated...</Typography>
          </Box>
        </Box>
      ))}

      {/* Research Modal */}
      <ResearchModal open={open} handleClose={handleClose} research={selectedResearch} />
    </Box>
  );
};

export default Researches;
