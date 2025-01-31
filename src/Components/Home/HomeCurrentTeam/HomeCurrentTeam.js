import React, { useEffect, useState } from 'react';
import HomeSingleTeamMember from './HomeSingleTeamMember/HomeSingleTeamMember';
import './HomeCurrentTeam.css';
import fakeData from './MOCK_DATA.json';
import { Link } from 'react-router-dom';
import { db } from './../../../Utils/Firebase';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { CircularProgress } from '@mui/material';

const HomeCurrentTeam = () => {

    const [teamData, setTeamData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTeamData = async () => {
            setLoading(true);
            try {
                const q = query(collection(db, "researchers"), limit(6)); // Get 6 researchers
                const querySnapshot = await getDocs(q);

                const researchers = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setTeamData(researchers);
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
                    // fakeData.map( Image =>  <HomeSingleTeamMember imageURL={Image.imageSrc} Caption={Image.Caption} />)
                    !loading && teamData.map((member)=>{
                        return <HomeSingleTeamMember key={member.id} {...member} />
                    })

                }
                {
                    loading && <CircularProgress size={100} sx={{color:'#fff'}}/>
                }
            </div>
            <Link to="/Researchers" className="see-all-button">See All</Link>
        </div>
    );
};

export default HomeCurrentTeam;