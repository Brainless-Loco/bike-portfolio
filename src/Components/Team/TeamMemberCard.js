import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const TeamMemberCard = ({ member, onClick }) => {
  return (
    <Card sx={{ mb: 2, bgcolor: "#fff", borderRadius: 2, boxShadow: 3, width: "31%" }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar src={member.profilePhoto} alt={member.name} sx={{ width: 80, height: 80, mr: 2, border:'1px solid #0c2461', '& img': { objectFit: 'contain' } }} />
          <Box>
            <Typography variant="h5">{member.name}</Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {member.position}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2">{member.shortDescription}</Typography>

        
          <Link to={"/Team/"+member.id}>
            <Button variant="contained" sx={{ mt: 2, display: "block", mx: "auto" }}>Know More</Button>
          </Link>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
