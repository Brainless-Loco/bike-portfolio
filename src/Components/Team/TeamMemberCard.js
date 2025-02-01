import { Card, CardContent, Typography, Avatar, Button, Box } from "@mui/material";

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

        <Button variant="contained" sx={{ mt: 2, display: "block", mx: "auto" }} onClick={onClick}>
          Know More
        </Button>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
