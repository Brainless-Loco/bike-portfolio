import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const TeamMemberCard = ({ member, onClick }) => {
  return (
    <Card 
      component={Link}
      to={"/team/"+member.id}
      sx={{ 
        mb: 2, 
        bgcolor: "#fff", 
        borderRadius: 2.5,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        mx: 2,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 1.5,
        overflow: "hidden",
        "&:hover": {
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
          "& .photoBox": {
            transform: "scale(1.08)"
          }
        }
      }} 
      className="col-md-6 col-lg-2 text-center"
    >
      <Box 
        className="photoBox"
        sx={{
          width: 140,
          height: 140,
          borderRadius: 2,
          overflow: "hidden",
          mb: 1.5,
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <img 
          src={member.profilePhoto}
          alt={member.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center"
          }}
        />
      </Box>
      
      <Typography 
        sx={{
          fontWeight: 700,
          fontSize: "1rem",
          color: "#1a1a1a",
          lineHeight: 1.3,
          textAlign: "center",
          px: 1
        }} 
        variant="subtitle1"
      >
        {member.name}
      </Typography>
    </Card>
  );
};

export default TeamMemberCard;
