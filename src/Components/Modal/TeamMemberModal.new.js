import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import AuthorPublications from "../Team/AuthorPublications";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Utils/Firebase";
import { useEffect, useRef, useState } from "react";
import { ForceGraph2D } from "react-force-graph";

const TeamMemberModal2 = ({ open, handleClose, member }) => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [imageCache, setImageCache] = useState({});
  const [noGraphData, setNoGraphData] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [graphInitialized, setGraphInitialized] = useState(false);

  const navigate = useNavigate();
  const fgRef = useRef();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const TabPanel = ({ children, value, index }) => {
    return (
      <Box role="tabpanel" hidden={value !== index} sx={{ mt: 2 }}>
        {value === index && children}
      </Box>
    );
  };


  const loadImage = (node) => {
    if (!imageCache[node.id]) {
      const img = new Image();
      img.src = node.profilePhoto;
      img.onload = () => {
        setImageCache(prev => ({ ...prev, [node.id]: img })); // Update state to trigger re-render
      };
    }
  };

  const fetchAuthorGraphById = async (authorId) => {
    const docRef = doc(db, "AuthorGraph", authorId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    return { id: docSnap.id, ...docSnap.data() };
  };

  useEffect(() => {
    if (!member) return;

    const loadGraphData = async () => {
      const author = await fetchAuthorGraphById(member.id);

      if (!author || !author.coAuthors || author.coAuthors.length === 0) {
        setNoGraphData(true);
        return;
      }

      setNoGraphData(false);

      const nodes = [
        {
          id: author.id,
          name: author.name,
          profilePhoto: author.profilePhoto
        },
        ...author.coAuthors.map(coAuthor => ({
          id: coAuthor.id,
          name: coAuthor.name,
          profilePhoto: coAuthor.profilePhoto
        }))
      ];

      // Find max count value for scaling
      const maxCount = Math.max(...author.coAuthors.map(coAuthor => coAuthor.count || 1), 1);
      const minDistance = 30;  // Min edge length
      const maxDistance = 45;  // Default edge length

      const links = author.coAuthors.map(coAuthor => ({
        source: author.id,
        target: coAuthor.id,
        count: coAuthor.count,
        distance: Math.max(minDistance, maxDistance * (maxCount / (coAuthor.count || 1))) // Scale distance
      }));

      setGraphData({ nodes, links });
    };

    loadGraphData();
  }, [member]);

  // Apply dynamic distances
  useEffect(() => {
    if (fgRef.current && graphData.links.length > 0) {
      fgRef.current.d3Force("link")
        .distance(link => link.distance); // Apply computed distance
      fgRef.current.d3ReheatSimulation(); // Restart simulation
    }
  }, [graphData]);

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="team-member-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: '95vw',
          height: '95vh',
          overflow: 'auto',
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'fixed',
            right: '2.5vw',
            top: '2.5vh',
            color: '#0c2461',
            backgroundColor: 'white',
            boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
            zIndex: 1300,
            width: '40px',
            height: '40px',
            '&:hover': {
              backgroundColor: 'white',
              color: '#1e3799',
              boxShadow: '0px 3px 6px rgba(0,0,0,0.3)'
            }
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Header Section */}
        <Box className="row align-items-center" sx={{ mb: 2 }}>
          <Box className="col-12 col-md-4" sx={{ textAlign: "center", height: "250px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Avatar
              src={member.profilePhoto}
              alt={member.name}
              sx={{
                maxWidth: "100%",
                width: "auto",
                height: "100%",
                borderRadius: "10px",
                border: "2px solid #0c2461",
                objectFit: "contain"
              }}
            />
          </Box>

          <Box className="col-12 col-md-7">
            <Typography variant="h3" sx={{ color: "#0c2461", fontWeight: 600 }}>
              {member.name}
            </Typography>
            <Typography variant="h6" sx={{ color: "text.secondary" }}>
              {member.position}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>Education:</strong> {member.educationLevel}
            </Typography>
          </Box>
        </Box>

        {/* Tabs Section */}
        <Box sx={{ width: '100%', mt: 2 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
              sx={{
                '& .MuiTab-root': { color: '#666', fontWeight: 600 },
                '& .Mui-selected': { color: '#0c2461 !important' },
                '& .MuiTabs-indicator': { backgroundColor: '#0c2461' }
              }}
            >
              <Tab label="Description" />
              <Tab label="Publications" />
              <Tab label="Co-Author Graph" />
            </Tabs>
          </Box>

          {/* Description Tab */}
          <TabPanel value={activeTab} index={0}>
            <Box className="ql-editor" sx={{ height: 'auto !important', minHeight: '300px' }}>
              <Box sx={{ height: 'auto' }} dangerouslySetInnerHTML={{ __html: member.broadDescription }} />
            </Box>
          </TabPanel>

          {/* Publications Tab */}
          <TabPanel value={activeTab} index={1}>
            <Box sx={{ minHeight: '300px' }}>
              <AuthorPublications id={member.id} />
            </Box>
          </TabPanel>

          {/* Co-Author Graph Tab */}
          <TabPanel value={activeTab} index={2}>
           <Box display={"flex"} justifyContent={"center"} width={"100%"}>
            {
              noGraphData ?
                <Typography variant="h6" my={4} color="textSecondary">No co-authors found for this author.</Typography>
                :
                <ForceGraph2D
                  ref={fgRef}
                  graphData={graphData}
                  enableNodeDrag={true}
                  nodeCanvasObject={(node, ctx) => {
                    const size = node.id === member.id ? 20 : 13;
                    loadImage(node);

                    if (!imageCache[node.id]) return;

                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false);
                    ctx.clip();
                    ctx.drawImage(imageCache[node.id], node.x - size, node.y - size, size * 2, size * 2);

                    // Add border
                    ctx.strokeStyle = "#0c2461";
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    ctx.restore();
                  }}
                  nodePointerAreaPaint={(node, color, ctx) => {
                    const size = node.id === member.id ? 20 : 13;
                    ctx.fillStyle = color;
                    ctx.fillRect(node.x - size, node.y - size, size * 2, size * 2);
                  }}
                  width={1000}
                  height={600}
                  nodeLabel={node => node.name}
                  onNodeClick={node => navigate(`/Team/${node.id}`)}
                  linkColor={() => "gray"}
                  linkWidth={1}

                  // 🔹 Handle Hover Effect
                  onLinkHover={link => setHoveredLink(link)}

                  // 🔹 Display "X Publications" on Hovered Edge
                  linkCanvasObjectMode={() => "after"}
                  linkCanvasObject={(link, ctx, globalScale) => {
                    if (!link || link !== hoveredLink || !link.count) return;

                    const { source, target } = link;
                    const midpointX = (source.x + target.x) / 2;
                    const midpointY = (source.y + target.y) / 2;

                    ctx.save();
                    // Set font style (Bold)
                    ctx.font = `bold ${14 / globalScale}px Arial`;
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";

                    // Measure text width for background padding
                    const text = `${link.count} Publications`;
                    const textWidth = ctx.measureText(text).width;
                    const padding = 6;
                    const backgroundHeight = 18 / globalScale; // Adjust background size

                    // Draw black background with rounded edges
                    ctx.fillStyle = "black";
                    ctx.globalAlpha = 0.8; // Slight transparency for better visibility
                    ctx.beginPath();
                    ctx.roundRect(
                      midpointX - textWidth / 2 - padding, // X position (centered)
                      midpointY - backgroundHeight / 2, // Y position
                      textWidth + padding * 2, // Width
                      backgroundHeight, // Height
                      4 // Border radius
                    );
                    ctx.fill();
                    ctx.globalAlpha = 1; // Reset transparency

                    // Draw white text over background
                    ctx.fillStyle = "white";
                    ctx.fillText(text, midpointX, midpointY);

                    // Restore previous state
                    ctx.restore();
                  }}
                />
            }
          </Box>
          </TabPanel>
        </Box>
      </Box>
    </Modal>
  );
};

export default TeamMemberModal2;