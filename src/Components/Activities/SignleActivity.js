import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

const SingleActivity = ({ activity, onOpenModal }) => {
  const navigate = useNavigate();

  const handleBoxClick = () => {
    navigate(`/latest/${activity.id}`);
  };

  return (
    <Box 
      onClick={handleBoxClick}
      sx={{ 
        p: 1.2, 
        bgcolor: "#fff", 
        borderRadius: 1, 
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)", 
        width: "85%", 
        marginBottom: 1.5, 
        borderLeft: "3px solid #0c2461",
        cursor: "pointer",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(12, 36, 97, 0.2)",
          borderLeftColor: "#617effff",
          bgcolor: "#0c2461",
          "& h6": {
            color: "#fff !important"
          },
          transform: "scale(1.02)"
        }
      }}>
      {/* Activity Title and Labels */}
      <Stack direction="column" alignItems="flex-start" spacing={0.6}>
        {/* <Link to={"/Latest/" + activity.id}> */}
          <Typography variant="subtitle1" sx={{ textAlign: "justify", fontWeight: '600', lineHeight: '110%', color: '#0c2461', minHeight: '20px', textDecoration: 'none', pb: 0.3, transition: "color 0.2s ease-in-out" }}>
            {activity.title}
          </Typography>
        {/* </Link> */}
        <Box display={"flex"} gap={0.5} flexWrap={'wrap'}>
          {activity.labels?.map((label, index) => (
            <Chip key={index} label={label} sx={{ borderRadius: "16px", bgcolor: "lightblue", fontSize: '12px', fontWeight: '600' }} />
          ))}
        </Box>
      </Stack>

      {/* Date */}
        <Typography variant="body2" sx={{ color: "gray", py: 0.3, mt: 0.3 }}>
          {new Date(activity.activityDate.seconds * 1000).toLocaleString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
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

    </Box>
  );
};

export default SingleActivity;
