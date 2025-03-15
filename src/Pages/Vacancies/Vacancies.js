import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Utils/Firebase";
import VacancyModal from "../../Components/Modal/VacanciesModal";
import { Helmet } from "react-helmet";

export default function Vacancies({ setNonHomePath }) {
    const [positionTypes, setPositionTypes] = useState([]);
    const [positionNames, setPositionNames] = useState({});
    const [selectedType, setSelectedType] = useState("");
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const fetchPositions = async () => {
            const querySnapshot = await getDocs(collection(db, "Vacancies"));
            const types = new Set();
            const namesMap = {};

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                types.add(data.position_type);

                if (!namesMap[data.position_type]) {
                    namesMap[data.position_type] = [];
                }

                // Store position_name along with its document ID
                namesMap[data.position_type].push({ position_name: data.position_name, id: doc.id });
            });

            setPositionTypes(Array.from(types));
            setPositionNames(namesMap);
        };

        fetchPositions();
        setNonHomePath(true);
    }, [setNonHomePath]);


    const handleOpenModal = (type) => {
        setSelectedType(type);
        setOpenModal(true);
    };

    return (
        <div className="container my-5 pt-5">
            <Helmet>
                <title>Vacancies | BIKE Lab</title>
                <meta name="description" 
                content="Vacant Positions in BIKE Lab" />
            </Helmet>

            {/* Title Section */}
            <Typography color="#0c2461" variant="h2" fontWeight="bold" gutterBottom>
                BIKE Lab Vacant Positions
            </Typography>

            <Typography variant="body1" className="mb-4">
                Find available positions within Scientific, Academic, PhD, or Technical and Administrative at <b>Big Data, Informationa and Knowledge Engineering Lab</b>  and become a colleague in our innovative research environment.
            </Typography>

            {/* Position Types List */}
            <Box className="bg-light p-4 rounded">
                <List>
                    {positionTypes.map((type) => (
                        <ListItem key={type} sx={{ mb: 1, cursor: 'pointer' }} button onClick={() => handleOpenModal(type)}>
                            <ListItemIcon >
                                <ArrowCircleRightOutlinedIcon sx={{ fontSize: 30 }} color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography fontSize={22} className="text-decoration-none text-primary fw-bold" >
                                        See vacant for {type} positions
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* BIKE Lab Culture, Vision, and Mission Sections */}
            <Box className="row mt-5 align-items-center">
                {/* Culture */}
                <Box className="col-md-6 p-4">
                    <Typography variant="h3" fontWeight="bold" color="#0c2461">
                        Our Culture
                    </Typography>
                    <Typography variant="body1">
                        At BIKE Lab, we foster a collaborative and inclusive culture that encourages innovation
                        and cutting-edge research. Our environment is driven by curiosity, integrity, and a
                        commitment to excellence.
                    </Typography>
                </Box>
                <Box className="col-md-6 text-center overflow-hidden" sx={{ height: "430px" }}>
                    <img
                        src="/Image/culture.jpg"
                        alt="Culture of BIKE Lab"
                        className="rounded shadow w-100"
                        style={{ height: "100%", objectFit: "cover" }}
                    />
                </Box>

            </Box>

            {/* Vision */}
            <Box className="row mt-5 align-items-center flex-md-row-reverse">
                <Box className="col-md-6 p-4">
                    <Typography variant="h3" fontWeight="bold" color="#0c2461">
                        Our Vision
                    </Typography>
                    <Typography variant="body1">
                        Providing data-driven solutions for societal challenges. We aim to be a globally recognized
                        research hub, leveraging advanced technologies to create meaningful impact in Boxerse fields.
                    </Typography>
                </Box>
                <Box className="col-md-6 text-center overflow-hidden" sx={{ height: "430px" }}>
                    <img
                        src="/Image/vision.jpg"
                        alt="Vision of BIKE Lab"
                        className="rounded shadow w-100"
                        style={{ height: "100%", objectFit: "cover" }}
                    />
                </Box>
            </Box>

            {/* Mission */}
            <Box className="row mt-5 align-items-center">
                <Box className="col-md-6 p-4">
                    <Typography variant="h3" color="#0c2461" fontWeight="bold">
                        Our Mission
                    </Typography>
                    <Typography variant="body1">
                        BIKE Lab conducts research that ranges from near-term applications to long-term exploratory projects. Our mission is to:
                    </Typography>
                    <ul className="ps-3" style={{ listStyle: 'square' }}>
                        <li> Passionately commit to going the extra mile.</li>
                        <li> Actively seek collaborations for innovative solutions.</li>
                        <li> Provide trustworthy and sustainable research-driven solutions.</li>
                    </ul>
                </Box>
                <Box className="col-md-6 text-center overflow-hidden" sx={{ height: "430px" }}>
                    <img
                        src="/Image/mission.png"
                        alt="Mision of BIKE Lab"
                        className="rounded shadow w-100 bg-light"
                        style={{ height: "100%", objectFit: "cover" }}
                    />
                </Box>
            </Box>

            {/* Vacancy Modal */}
            <VacancyModal
                open={openModal}
                handleClose={() => setOpenModal(false)}
                positionType={selectedType}
                positionNames={positionNames[selectedType] || []}
            />
        </div>
    );
}
