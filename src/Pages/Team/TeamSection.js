import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Box, Typography } from "@mui/material";
import { db } from "../../Utils/Firebase";
import TeamMemberModal from './../../Components/Modal/TeamMemberModal';
import TeamMemberCard from './../../Components/Team/TeamMemberCard';
import { useLocation } from "react-router-dom";

const TeamSection = ({setNonHomePath}) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [open, setOpen] = useState(false);

  const { state }= useLocation();



  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "researchers"));
        const membersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTeamMembers(membersData);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };
    setNonHomePath(true)
    fetchTeamMembers();
  }, [setNonHomePath]);

  useEffect(()=>{
    if(state?.id){
      setSelectedMember(teamMembers.find((member) => member.id === state.id));
      setOpen(true);
    }else{
      setSelectedMember(null);
      setOpen(false);
    }
    // eslint-disable-next-line
  },[state.id])

  const groupedMembers = {
    Current: teamMembers.filter((member) => !member.isFormer),
    Former: teamMembers.filter((member) => member.isFormer),
  };

  return (
    <Box sx={{ paddingTop: "100px", paddingX: "5%" }}>
      <Typography variant="h4" sx={{ color: "blue" }} gutterBottom>
        Meet Our Team
      </Typography>

      {Object.entries(groupedMembers).map(([category, members]) => (
        <Box key={category} sx={{ my: 4 }}>
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              pb: 1,
              borderBottom: "2px solid #1976d2",
              display: "inline-block",
              width: "100%",
            }}
          >
            {category} Members
          </Typography>
          <Box className={"d-flex flex-wrap"} gap={5}>
            {members.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                onClick={() => {
                  setSelectedMember(member);
                  setOpen(true);
                }}
              />
            ))}
          </Box>
        </Box>
      ))}

      {/* Modal for showing details */}
      {selectedMember && (
        <TeamMemberModal
          open={open}
          handleClose={() => setOpen(false)}
          member={selectedMember}
        />
      )}
    </Box>
  );
};

export default TeamSection;
