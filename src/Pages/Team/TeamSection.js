import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography";
import { getDocs, collection } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { db } from "../../Utils/Firebase";
import TeamMemberModal from './../../Components/Modal/TeamMemberModal';
import TeamMemberCard from './../../Components/Team/TeamMemberCard';

const TeamSection = ({ setNonHomePath }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [open, setOpen] = useState(false);
  const { state } = useLocation();

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
    setNonHomePath(true);
    fetchTeamMembers();
  }, [setNonHomePath]);

  useEffect(() => {
    if (state && state.id) {
      setSelectedMember(teamMembers.find((member) => member.id === state.id));
      setOpen(true);
    } else {
      setSelectedMember(null);
      setOpen(false);
    }
  }, [state, teamMembers]);


  const positionOrder = ["Director", "Research Assistant", "Teacher", "Researcher", "Student", "Others"];

  const categorizedMembers = {
    Current: {},
    Former: {},
  };

  // Categorize members into "Current" and "Former" by position
  teamMembers.forEach((member) => {
    const category = member.isFormer ? "Former" : "Current";
    const position = member.position || "Others";

    if (!categorizedMembers[category][position]) {
      categorizedMembers[category][position] = [];
    }

    categorizedMembers[category][position].push(member);
  });

  // Sorting order for positions

  // Sorting order for Researchers
  const researcherOrder = ["PhD Student", "MS Student", "BSc Student", "Teacher", "Others"];

  // Process each category (Current, Former)
  Object.keys(categorizedMembers).forEach((category) => {
    const sortedPositions = {};

    // Sort positions based on predefined order
    Object.keys(categorizedMembers[category])
      .sort((a, b) => positionOrder.indexOf(a) - positionOrder.indexOf(b))
      .forEach((position) => {
        sortedPositions[position] = categorizedMembers[category][position];
      });

    categorizedMembers[category] = sortedPositions;

    // Handle "Researchers" separately
    if (categorizedMembers[category]["Researcher"]) {
      const researchers = categorizedMembers[category]["Researcher"];
      const groupedResearchers = {};
      researchers.forEach((member) => {
        const eduLevel = researcherOrder.includes(member.educationLevel) ? member.educationLevel : "Others";
        if (!groupedResearchers[eduLevel]) {
          groupedResearchers[eduLevel] = [];
        }
        groupedResearchers[eduLevel].push(member);
      });


      // Sort each researcher subcategory by name
      researcherOrder.forEach((eduLevel) => {
        if (groupedResearchers[eduLevel]) {
          groupedResearchers[eduLevel].sort((a, b) => a.name.localeCompare(b.name));
        }
      });

      categorizedMembers[category]["Researcher"] = groupedResearchers;

      console.log(categorizedMembers[category]["Researcher"]);

    }
  });


  return (
    <Box sx={{ paddingTop: "100px", paddingX: "5%" }}>
      <Typography variant="h3" sx={{ color: "#0c2461" }} gutterBottom>
        Meet Our Team
      </Typography>

      {Object.entries(categorizedMembers).map(([category, positions]) => (
        <Box key={category} sx={{ my: 4 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 2, pb: 1, borderBottom: "2px solid #1976d2", display: "inline-block", width: "100%",
            }}
            color="#0c2461"
            fontWeight={600}
          >
            {category} Members
          </Typography>
          {Object.entries(positions).sort().map(([position, members]) => (
            <Box key={position} sx={{ my: 2 }}>
              <Typography
                variant="h6" color="#0c2461" fontWeight={600} sx={{
                  mb: 2, pb: 1, borderBottom: "2px solid #1976d2", display: "inline-block", width: "100%",
                }}
              >
                {position}
              </Typography>

              {position !== "Researcher" ? (
                <Box className="d-flex flex-wrap" gap={5}>
                  {members.map((member) => (
                    <TeamMemberCard key={member.id} member={member} onClick={() => {
                      setSelectedMember(member); setOpen(true);
                    }}
                    />
                  ))}
                </Box>
              ) : (
                  researcherOrder.filter((eduLevel)=> members[eduLevel]).map((eduLevel)=>(
                    <Box key={eduLevel} sx={{ my: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        sx={{ mb: 2, pb: 1, borderBottom: "2px solid #1976d2",
                          display: "inline-block", width: "100%",
                        }} >
                        {eduLevel}
                      </Typography>
                      <Box className={"d-flex flex-wrap"} gap={5}>
                        {members[eduLevel].map((member) => 
                          (<TeamMemberCard
                            key={member.id}
                            member={member}
                            onClick={() => {
                              setSelectedMember(member);
                              setOpen(true);
                            }}
                          />)
                        )}
                      </Box>
                    </Box>
                  ))
                  
              )}
            </Box>
          ))}
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
