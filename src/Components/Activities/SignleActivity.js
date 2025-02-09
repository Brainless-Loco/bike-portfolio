import React from "react";
import { Box, Typography, Button, Chip, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const SingleActivity = ({ activity, onOpenModal }) => {
  return (
    <Box sx={{ p: 2, bgcolor: "#fff", borderRadius: 2, boxShadow: 3, width: "85%", marginBottom: 2 }}>
      {/* Activity Title and Labels */}
      <Stack direction="column" alignItems="flex-start" spacing={1}>
        <Link to={"/Latest/" + activity.id}>
          <Typography variant="subtitle1" sx={{ textAlign: "justify", fontWeight: '600', lineHeight: '110%', color: '#0c2461', minHeight: '20px', textDecoration: 'none', borderBottom: '1px solid #0c2461', pb: 1, }}>{activity.title}</Typography>
        </Link>
        <Box display={"flex"} gap={0.5} flexWrap={'wrap'}>
          {activity.labels?.map((label, index) => (
            <Chip key={index} label={label} sx={{ borderRadius: "16px", bgcolor: "lightblue", fontSize: '12px', fontWeight: '600' }} />
          ))}
        </Box>
      </Stack>

      {/* Date */}
      <Typography variant="body2" sx={{ color: "gray", py: 1 }}>
        {new Date(activity.activityDate.seconds * 1000).toLocaleString("en-US", { month: "short", year: "numeric" })}
      </Typography>

      {/* Short Description */}
      {/* <Typography variant="body2" sx={{ mb: 1, minHeight:'50px',  textAlign: "justify" }}>
        {activity.shortDescription.length > 350
          ? `${activity.shortDescription.substring(0, 350)}...`
          : activity.shortDescription}
      </Typography> */}

      {/* External Links */}
      {/* <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
        {activity.externalLinks?.map((link, index) => (
          <Button key={index} variant="outlined" href={link.url} target="_blank" sx={{ borderRadius: 20 }}>
            {link.title}
          </Button>
        ))}
      </Stack> */}

      {/* Details Button */}
      {/* <Link to={"/Latest/"+activity.id}> 
        <Button  variant="contained" sx={{backgroundColor:'#0c2461', color:'white'}}>
          Details
        </Button>
      </Link> */}

    </Box>
  );
};

export default SingleActivity;
