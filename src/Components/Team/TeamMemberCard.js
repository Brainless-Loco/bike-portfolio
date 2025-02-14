import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const TeamMemberCard = ({ member, onClick }) => {
  return (
    <Card sx={{ mb: 2, bgcolor: "#fff", borderRadius: 2, boxShadow: 3, mx:2 }} className="col-md-6 col-lg-2 text-center">
      <CardContent className="d-flex px-0 justify-content-center align-items-center">
        <Link to={"/Team/"+member.id} sx={{ display: "flex", alignItems: "center", mb: 2,}} className="justify-content-center px-0">
          <Avatar src={member.profilePhoto} alt={member.name} sx={{ width: 150, height: 150, mx: 'auto', border: '2px solid #0c2461', '& img': { objectFit: 'contain' } }} />
          <Box>
            <Typography sx={{lineHeight:1, my:1, fontWeight:600}} variant="subtitle1">{member.name}</Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {member.position}
            </Typography>
          </Box>
        </Link>

        {/* <Typography variant="body2">{member.shortDescription}</Typography> */}

{/* 
        <Link to={"/Team/" + member.id}>
          <Button variant="contained" sx={{ mt: 2, display: "block", mx: "auto" }}>Know More</Button>
        </Link> */}
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
