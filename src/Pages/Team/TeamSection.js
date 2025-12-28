import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography";
import { getDocs, collection } from "firebase/firestore";
import { useLocation, useParams } from "react-router-dom";
import { db } from "../../Utils/Firebase";
import TeamMemberModal from './../../Components/Modal/TeamMemberModal';
import TeamMemberCard from './../../Components/Team/TeamMemberCard';
import { Helmet } from "react-helmet";
// import TeamMemberModal2 from "../../Components/Modal/TeamMemberModal.new";

const TeamSection = ({ setNonHomePath }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [open, setOpen] = useState(false);
  const { state } = useLocation();

  const { profileID } = useParams();

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

  useEffect(() => {
    if (profileID) {
      const member = teamMembers.find((member) => member.id === profileID);
      setSelectedMember(member);
      setOpen(true);
    }
  }, [profileID, teamMembers])


  const positionOrder = ["Director", "Research Assistant", "Researcher", "Office Members", "Others"];

  const categorizedMembers = {
    Current: {},
    Former: {},
  };

  // Categorize members into "Current" and "Former" by position
  teamMembers.forEach((member) => {
    const category = member.isFormer ? "Former" : "Current";
    const position = member.position || "Others";

    if (position !== 'Co Author' && position !== 'Supervisor' && !categorizedMembers[category][position]) {
      categorizedMembers[category][position] = [];
    }

    if (position !== 'Co Author' && position !== 'Supervisor') categorizedMembers[category][position].push(member);
  });

  // Sorting order for Researchers and Office Members by education level
  const educationLevelOrder = ["PhD Student", "MS Student", "BSc Student", "Others"];

  // Process each category (Current, Former)
  Object.keys(categorizedMembers).forEach((category) => {
    const sortedPositions = {};

    // Sort positions based on predefined order, with unknown positions at the end
    Object.keys(categorizedMembers[category])
      .sort((a, b) => {
        const indexA = positionOrder.indexOf(a);
        const indexB = positionOrder.indexOf(b);
        // If position is not in the predefined order, put it at the end
        const orderA = indexA === -1 ? positionOrder.length : indexA;
        const orderB = indexB === -1 ? positionOrder.length : indexB;
        return orderA - orderB;
      })
      .forEach((position) => {
        sortedPositions[position] = categorizedMembers[category][position];
      });

    categorizedMembers[category] = sortedPositions;

    // Handle "Researchers" and "Office Members" separately (both have education level subcategories)
    ["Researcher", "Office Members"].forEach((positionType) => {
      if (categorizedMembers[category][positionType]) {
        const members = categorizedMembers[category][positionType];
        const groupedMembers = {};
        members.forEach((member) => {
          const eduLevel = member.educationLevel && member.educationLevel.trim() ? member.educationLevel : "Others";
          if (!groupedMembers[eduLevel]) {
            groupedMembers[eduLevel] = [];
          }
          groupedMembers[eduLevel].push(member);
        });

        // Sort each subcategory by name
        educationLevelOrder.forEach((eduLevel) => {
          if (groupedMembers[eduLevel]) {
            groupedMembers[eduLevel].sort((a, b) => a.name.localeCompare(b.name));
          }
        });

        // Add any other education levels not in the predefined order
        Object.keys(groupedMembers).forEach((eduLevel) => {
          if (!educationLevelOrder.includes(eduLevel)) {
            groupedMembers[eduLevel].sort((a, b) => a.name.localeCompare(b.name));
          }
        });

        categorizedMembers[category][positionType] = groupedMembers;
      }
    });
  });


  return (
    <Box sx={{ paddingTop: "110px", paddingX: "5%" }}>
      <Helmet>
        <title>Team Members | BIKE Lab</title>
        <meta name="description" content="Meet the team members of the BIKE Lab" />
      </Helmet>
      <Typography variant="h2" sx={{ color: "#0c2461" }} gutterBottom>
        Meet Our Team
      </Typography>

      {Object.entries(categorizedMembers).map(([category, positions], idx) => {
        return (
          <Box key={idx} sx={{ my: 4 }}>
            <Typography
              variant="h4" color="#0c2461" fontWeight={600}
              sx={{
                mb: 2, pb: 1, borderBottom: "2px solid #1976d2", display: "inline-block", width: "100%",
              }}
            >
              {category} Members
            </Typography>
            {Object.entries(positions)
              .sort((a, b) => {
                const indexA = positionOrder.indexOf(a[0]);
                const indexB = positionOrder.indexOf(b[0]);
                const orderA = indexA === -1 ? positionOrder.length : indexA;
                const orderB = indexB === -1 ? positionOrder.length : indexB;
                return orderA - orderB;
              })
              .map(([position, members]) => {
              if (category === 'Former' && position === 'Student') {
                // console.log(position);
                return <></>
              }
              return <Box key={category+position} sx={{ my: 2 }}>
                <Typography
                  variant="h6" color="#0c2461" fontWeight={600} sx={{
                    mb: 2, pb: 1, borderBottom: "2px solid #1976d2", display: "inline-block", width: "100%",
                  }}
                >
                  {position}
                </Typography>

                {position !== "Researcher" && position !== "Office Members" ? (
                  <Box className="d-flex flex-wrap justify-content-between" gap={5}>
                    {members.map((member) => (
                      <TeamMemberCard key={member.id} member={member} onClick={() => {
                        setSelectedMember(member); setOpen(true);
                      }}
                      />
                    ))}
                  </Box>
                ) : (
                  Object.keys(members).filter((eduLevel) => educationLevelOrder.includes(eduLevel) || members[eduLevel]).sort((a, b) => {
                    const indexA = educationLevelOrder.indexOf(a);
                    const indexB = educationLevelOrder.indexOf(b);
                    const orderA = indexA === -1 ? educationLevelOrder.length : indexA;
                    const orderB = indexB === -1 ? educationLevelOrder.length : indexB;
                    return orderA - orderB;
                  }).map((eduLevel) => (
                    <Box key={eduLevel} sx={{ my: 2 }}>
                      <Typography variant="subtitle1" fontWeight={600}
                        sx={{ mb: 2, pb: 1, borderBottom: "2px solid #1976d2", display: "inline-block", width: "100%", }} >
                        {eduLevel}
                      </Typography>
                      <Box className={"d-flex flex-wrap justify-content-start"}>
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
            })}
          </Box>
        )
      })}

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
