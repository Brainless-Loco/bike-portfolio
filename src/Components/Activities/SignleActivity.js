import React from "react";
import { Box, Typography, Button, Chip, Stack } from "@mui/material";

const SingleActivity = ({ activity, onOpenModal }) => {
  return (
    <Box sx={{ p: 2, bgcolor: "#fff", borderRadius: 2, boxShadow: 3, width: "45%", marginBottom: 2 }}>
      {/* Activity Title and Labels */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="h6">{activity.title}</Typography>
        {activity.labels?.map((label, index) => (
          <Chip key={index} label={label} sx={{ borderRadius: "16px", bgcolor: "lightblue" }} />
        ))}
      </Stack>

      {/* Date */}
      <Typography variant="body2" sx={{ color: "gray" }}>
        {new Date(activity.activityDate.seconds * 1000).toLocaleString("en-US", { month: "short", year: "numeric", day: "numeric" })}
      </Typography>

      {/* Short Description */}
      <Typography variant="body1" sx={{ mb: 1 }}>
        {activity.shortDescription}
      </Typography>

      {/* External Links */}
      {/* <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
        {activity.externalLinks?.map((link, index) => (
          <Button key={index} variant="outlined" href={link.url} target="_blank" sx={{ borderRadius: 20 }}>
            {link.title}
          </Button>
        ))}
      </Stack> */}

      {/* Details Button */}
      <Button variant="contained" color="primary" onClick={() => onOpenModal(activity)}>
        Details
      </Button>
    </Box>
  );
};

export default SingleActivity;
