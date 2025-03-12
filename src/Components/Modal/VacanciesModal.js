import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: '80vw',
    height: '80vh',
    overflow: 'auto',
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

export default function VacancyModal({ open, handleClose, positionType, positionNames }) {

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="vacancy-modal">
            <Box sx={modalStyle}>
                {/* Close Button */}
                <IconButton onClick={handleClose} sx={{ position: "absolute", right: 10, top: 10 }}>
                    <CloseIcon />
                </IconButton>

                {/* Modal Title */}
                <Typography variant="h3" color="#0c2461" fontWeight="bold" gutterBottom>
                    All vacant {positionType} Positions at BIKE Lab
                </Typography>

                {/* Position Name List */}
                <List>
                    {positionNames.map((pos) => (
                        <ListItem key={pos.id}>
                            <ListItemIcon>
                                <RadioButtonCheckedOutlinedIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Link to={`/Vacancies/${pos.id}`} className="text-decoration-none text-primary fw-bold">
                                        {pos.position_name}
                                    </Link>
                                }
                            />
                        </ListItem>
                    ))}
                    
                </List>
            </Box>
        </Modal>
    );
}
