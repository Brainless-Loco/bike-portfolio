import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "./../../Utils/Firebase";
import { ForceGraph2D } from "react-force-graph";
import Box  from "@mui/material/Box";
// import { Helmet } from "react-helmet";

const db = getFirestore(app);

const fetchAuthorsGraph = async () => {
    const querySnapshot = await getDocs(collection(db, "AuthorGraph"));
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

const AuthorGraphVisualization = ({id, setNonHomePath}) => {
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const [imageCache, setImageCache] = useState({}); // Cache to store loaded images

    const loadImage = (node) => {
        if (!imageCache[node.id]) {
            const img = new Image();
            img.src = node.profilePhoto;
            img.onload = () => {
                setImageCache(prev => ({ ...prev, [node.id]: img })); // Update state to trigger re-render
            };
        }
    };
    const navigate = useNavigate();

    useEffect(() => {
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
    }, []);

    useEffect(()=>{
        if(setNonHomePath) setNonHomePath(true)
    },[setNonHomePath])

    return (
        <Box sx={{ borderRadius: 2, overflow:'hidden', border:'1px solid green' }}>
            {/* <Helmet>
                <title>Author Graph | BIKE Lab</title>
                <meta name="description" content="Visualize the connections between authors in the BIKE Lab research." />
            </Helmet> */}
            <ForceGraph2D
                graphData={graphData}
                enableNodeDrag={true} // Allow dragging nodes
                nodeCanvasObject={(node, ctx) => {
                    const size = id ? node.id === id ?20: 10:10;
                    if (!imageCache[node.id]) {
                        loadImage(node);
                        return;
                    }
            
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false);
                    ctx.clip();
                    ctx.drawImage(imageCache[node.id], node.x - size, node.y - size, size * 2, size * 2);
                    ctx.restore();
                }}
                nodePointerAreaPaint={(node, color, ctx) => {
                    const size = id ? node.id === id ?20: 10:10;
                    ctx.fillStyle = color;
                    ctx.fillRect(node.x - size, node.y - size, size * 2, size * 2);
                }}
                zoom={true} // Enable zooming
                pan={true} // Enable panning
                nodeLabel={node => node.name}  // ✅ FIX: Ensure this returns a string
                onNodeClick={node => navigate(`/Team/${node.id}`)}
                linkWidth={'100%'}
                linkColor={() => "gray"}
            />
        </Box>
    );
};

export default AuthorGraphVisualization;
