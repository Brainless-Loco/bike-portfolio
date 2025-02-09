import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import AuthorGraphVisualization from "../../Pages/AuthorGraph/AuthorGraphVisualization";
import { Link, useNavigate } from "react-router-dom";
import AuthorPublications from "../Team/AuthorPublications";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Utils/Firebase";
import { useEffect, useRef, useState } from "react";
import { ForceGraph2D } from "react-force-graph";

const TeamMemberModal = ({ open, handleClose, member }) => {

  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [imageCache, setImageCache] = useState({}); // Cache to store loaded images

  const navigate = useNavigate();

  const fgRef = useRef();

  const loadImage = (node) => {
    if (!imageCache[node.id]) {
      const img = new Image();
      img.src = node.profilePhoto;
      img.onload = () => {
        setImageCache(prev => ({ ...prev, [node.id]: img })); // Update state to trigger re-render
      };
    }
  };

  const fetchAuthorsGraph = async () => {
    const querySnapshot = await getDocs(collection(db, "AuthorGraph"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  };

  useEffect(() => {
    if (!member) return;
    const loadGraphData = async () => {
      const authors = await fetchAuthorsGraph();
      const nodes = authors.map(author => ({
        id: author.id,
        name: author.name,
        profilePhoto: author.profilePhoto
      }));

      const links = authors.flatMap(author =>
        author.coAuthors.map(coAuthor => ({
          source: author.id,
          target: coAuthor.id
        }))
      );

      setGraphData({ nodes, links });
    };

    loadGraphData();
  }, [member]);

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force("link").distance(70); // Ensures min distance between nodes
      fgRef.current.d3ReheatSimulation(); // Restart simulation to apply the change
    }
  }, [graphData]);
  

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="team-member-modal">
      <Box
        sx={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)", width: '90vw', height: '90vh',
          overflow: 'auto', bgcolor: "background.paper", borderRadius: 2, boxShadow: 24, p: 4,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Avatar src={member.profilePhoto} alt={member.name} sx={{ width: 100, height: 100, mx: "auto", mb: 1, '& img': { objectFit: 'contain' }, border: '1px solid #0c2461' }} />
          <Typography variant="h6" color="#0c2461" fontWeight={600}>{member.name}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {member.position}
          </Typography>
        </Box>

        <Typography variant="body1">
          <strong>Education:</strong> {member.educationLevel}
        </Typography>

        <Typography variant="h6" fontWeight={600} color="#0c2461" borderBottom={"2px solid #0c2461"}>Description</Typography>
        <Box sx={{ mt: 1, minHeight: '40%', textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: member.broadDescription }} />

        <Box my={2} minHeight={'200px'} width={'100%'} >
          <Typography variant="h6" fontWeight={600} color="#0c2461" borderBottom={"2px solid #0c2461"}>Publications</Typography>
          <AuthorPublications id={member.id} />
        </Box>

        <Box my={2} display={'flex'} flexDirection={"column"} height={'400px'} width={'100%'}>
          <Typography variant="h6" fontWeight={600} color="#0c2461" borderBottom={"2px solid #0c2461"}>Co Author Graph</Typography>
          <Box display={"flex"} justifyContent={"center"} width={"100%"}>
          <ForceGraph2D
            ref={fgRef}
            graphData={graphData}
            enableNodeDrag={true}
            nodeCanvasObject={(node, ctx) => {
              const size = node.id === member.id ? 20 : 10;
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
              const size = node.id === member.id ? 20 : 10;
              ctx.fillStyle = color;
              ctx.fillRect(node.x - size, node.y - size, size * 2, size * 2);
            }}
            width={600} // Ensure proper width
            height={400} // Ensure proper height
            nodeLabel={node => node.name}
            onNodeClick={node => navigate(`/Team/${node.id}`)}
            linkColor={() => "gray"}
            linkWidth={1}
          />
          </Box>

        </Box>
        <Box width={'100%'}>

          <Link to={'/Team'} onClick={handleClose}>
            <Button variant="contained" sx={{ mt: 3, display: "block", mx: "auto" }} >
              Close
            </Button>
          </Link>
        </Box>
      </Box>
    </Modal>
  );
};

export default TeamMemberModal;
