import React, { useEffect, useState } from 'react';
import HomeSingleTeamMember from './HomeSingleTeamMember/HomeSingleTeamMember';
import './HomeCurrentTeam.css';
import { Link } from 'react-router-dom';
import { db } from './../../../Utils/Firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { CircularProgress } from '@mui/material';

const HomeCurrentTeam = () => {

    const [teamData, setTeamData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTeamData = async () => {
            setLoading(true);
            try {
                const q = query(collection(db, "researchers")); // Fetch all researchers
                const querySnapshot = await getDocs(q);
        
                const researchers = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
        
                // Filter only current members (isFormer == false)
                const currentResearchers = researchers.filter(member => !member.isFormer);
        
                // Categorize members
                const categorized = {
                    "Director": [],
                    "Research Assistant": [],
                    "PhD Student": [],
                    "MS Student": [],
                    "BSc Student": []
                };
        
                currentResearchers.forEach(member => {
                    // Categorize based on position for Director and Research Assistant
                    if (member.position === "Director") {
                        categorized["Director"].push(member);
                    } else if (member.position === "Research Assistant") {
                        categorized["Research Assistant"].push(member);
                    } else {
                        // Categorize based on education level for students
                        if (categorized[member.educationLevel]) {
                            categorized[member.educationLevel].push(member);
                        }
                    }
                });
        
                // Select members in the required order
                const selected = [];
        
                // Take the Director if available
                if (categorized["Director"].length) selected.push(categorized["Director"][0]);
        
                // Take the Research Assistant if available
                if (categorized["Research Assistant"].length) selected.push(categorized["Research Assistant"][0]);
        
                // Take one PhD Student if available
                if (categorized["PhD Student"].length) selected.push(categorized["PhD Student"][0]);
        
                // Randomly select 2 MS Students if available
                if (categorized["MS Student"].length) {
                    const msStudents = [...categorized["MS Student"]].sort(() => 0.5 - Math.random());
                    selected.push(...msStudents.slice(0, 2));
                }
        
                // Randomly select 1 BSc Student if available
                if (categorized["BSc Student"].length) {
                    const bscStudents = [...categorized["BSc Student"]].sort(() => 0.5 - Math.random());
                    selected.push(bscStudents[0]);
                }
        
                // Set the selected team members
                setTeamData(selected);
            } catch (error) {
                console.error("Error fetching researchers:", error);
            }
            setLoading(false);
        };
        
        

        fetchTeamData();
        // eslint-disable
        }, []);



    return (
        <div className="pb-5 pt-3 text-center svg-bg">
            <h1 className="display-4 text-center text-white glipse-title">Proud Team of BIKE</h1>
            <div className="d-flex mb-5 justify-content-center flex-wrap" style={{gap:'30px'}}  uk-scrollspy="target: > .EachMemory; cls: uk-animation-fade; delay: 300"  uk-lightbox="animation: fade">
                {
                    !loading && teamData.map((member)=>{
                        return <HomeSingleTeamMember key={member.id} {...member} />
                    })

                }
                {
                    loading && <CircularProgress size={100} sx={{color:'#fff'}}/>
                }
            </div>
            <Link to="/Team" className="see-all-button">See All</Link>
        </div>
    );
};

export default HomeCurrentTeam;