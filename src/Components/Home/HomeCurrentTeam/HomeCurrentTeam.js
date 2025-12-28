import React, { useEffect, useState } from 'react';
import HomeSingleTeamMember from './HomeSingleTeamMember/HomeSingleTeamMember';
import './HomeCurrentTeam.css';
import { Link } from 'react-router-dom';
import { getFeaturedMembers } from './../../../Utils/FeaturedMembersService';
import CircularProgress  from '@mui/material/CircularProgress';

const HomeCurrentTeam = () => {

    const [teamData, setTeamData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTeamData = async () => {
            setLoading(true);
            try {
                // Fetch featured members from the new collection
                const featuredMembers = await getFeaturedMembers();
        
                if (featuredMembers && featuredMembers.length > 0) {
                    // Featured members are already in the correct order
                    setTeamData(featuredMembers);
                } else {
                    // Fallback: If no featured members are set, show nothing or a default message
                    // You can change this to show a default selection if preferred
                    setTeamData([]);
                }
            } catch (error) {
                console.error("Error fetching featured members:", error);
                setTeamData([]);
            }
            setLoading(false);
        };
        
        fetchTeamData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="pb-5 pt-3 text-center svg-bg">
            <h1 className="display-4 text-center text-white glipse-title">Proud Team of BIKE</h1>
            <div className="d-flex mb-5 justify-content-center flex-wrap" style={{gap:'20px'}}  uk-scrollspy="target: > .EachMemory; cls: uk-animation-fade; delay: 300"  uk-lightbox="animation: fade">
                {
                    !loading && teamData.length > 0 && teamData.map((member)=>{
                        return <HomeSingleTeamMember key={member.id} {...member} />
                    })
                }
                {
                    !loading && teamData.length === 0 && (
                        <p style={{ color: '#fff', fontSize: '18px' }}>No featured members yet</p>
                    )
                }
                {
                    loading && <CircularProgress size={100} sx={{color:'#fff'}}/>
                }
            </div>
            <Link to="/team" className="see-all-button">See All</Link>
        </div>
    );
};

export default HomeCurrentTeam;