import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";

const ActivityModal = ({ activity, onClose }) => {
  if (!activity) return null;

  return (
    <Modal open={Boolean(activity)} onClose={onClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
      <Box sx={{ width: "85%", bgcolor: "white", p: 4, borderRadius: 2, boxShadow: 3, mx: "auto", height: '95vh', overflow: 'scroll' }}>
        {/* Title */}
        <Typography variant="h5" sx={{ mb: 1, color: '#0c2461' }}>
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

        {/* Long Description */}
        <Box className="ql-editor">
          <Box sx={{ mb: 2, minHeight: '65%', overflow: 'scroll' }} dangerouslySetInnerHTML={{ __html: activity.longDescription }} />
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
        <Box className="text-right">
          <Link to={"/Latest"}>
            <Button variant="contained" onClick={onClose}>
              Close
            </Button>
          </Link>
        </Box>

      </Box>
    </Modal>
  );
};

export default ActivityModal;
