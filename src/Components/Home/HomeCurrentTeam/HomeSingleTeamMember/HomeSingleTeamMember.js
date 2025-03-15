import React from 'react';
import './HomeSingleTeamMember.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const HomeSingleTeamMember = ({name, educationLevel, position, shortDescription, profilePhoto}) => {
    return (
        <Box className="EachResearcher mb-4 mx-3" >
            <img src={profilePhoto} alt=""/>
            <Typography variant='body2' className="py-0 my-0">{name}</Typography>
            <i className="ResearcherName py-0 my-0">{position}</i>
            <a className="uk-inline ResearcherDescDiv" href={profilePhoto} data-type="image" data-caption={shortDescription} /* Ekhane Caption or behind the story Hobe */>
                <Box className="ResearcherDescription">
                    <p className="title py-0 my-0">{name}</p>
                    <p className="date py-0 mt-1 mb-0">{position}</p>
                    <p className="date py-0 mt-1">{educationLevel}</p>
                    <p className="text-white my-0"> <i className="fas fa-link"></i> Preview </p>
                </Box>
            </a>
        </Box>
    );
};

export default HomeSingleTeamMember;