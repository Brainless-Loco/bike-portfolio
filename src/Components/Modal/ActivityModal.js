import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { Link, useNavigate } from "react-router-dom";

const ActivityModal = ({ activity, onClose }) => {
  const navigate = useNavigate();

  if (!activity) return null;

  const handleClose = () => {
    onClose();
    navigate('/latest');
  };

  return (
    <Modal open={Boolean(activity)} onClose={handleClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
      <Box sx={{ width: "85%", bgcolor: "white", p: 4, borderRadius: 2, boxShadow: 3, mx: "auto", height: '95vh', overflow: 'scroll', position: 'relative', pr: 6 }}>
        {/* Close Button - Fixed at top right corner of modal */}
        {/* <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: '2%',
            right: '2%',
            bgcolor: '#d32f2f',
            color: 'white',
            width: 44,
            height: 44,
            zIndex: 1000,
            '&:hover': {
              bgcolor: '#c62828'
            }
          }}
        >
          <CloseIcon />
        </IconButton> */}

        {/* Title */}
        <Typography variant="h5" sx={{ mb: 1, color: '#0c2461' }} lineHeight={1}>
          {activity.title}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {/* Labels */}
        <Stack direction="row" spacing={1} mb={2}>
          {activity.labels?.map((label, index) => (
            <Chip key={index} label={label} sx={{ borderRadius: "16px", bgcolor: "lightblue" }} />
          ))}
        </Stack>

        {/* Date */}
        <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
          {new Date(activity.activityDate.seconds * 1000).toLocaleString("en-US", { month: "short", year: "numeric", day: "numeric" })}
        </Typography>

          <Box sx={{ minHeight: '65%',}}>
            <Box className="ql-editor" sx={{ mb: 2, overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: activity.longDescription }} />
          </Box>
          {/* External Links */}
        <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
          {activity.externalLinks?.map((link, index) => (
            <Button key={index} variant="outlined" href={link.url} target="_blank" sx={{ borderRadius: 20, color: '#0c2461', borderColor: '#0c2461', fontWeight: '600' }}>
              {link.title}
            </Button>
          ))}
        </Stack>

        {/* Close Button */}
        <Box className="text-center">
          <Link to={"/latest"}>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </Link>
        </Box>

      </Box>
    </Modal>
  );
};

export default ActivityModal;
