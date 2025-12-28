import React from 'react';
import './HomeSingleTeamMember.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';

const HomeSingleTeamMember = ({name, educationLevel, position, shortDescription, profilePhoto}) => {
    return (
        <Card className="FeaturedMemberCard">
            <Box className="ImageContainer">
                <CardMedia
                    component="img"
                    image={profilePhoto}
                    alt={name}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </Box>
            <CardContent sx={{ pb: 1.5 }}>
                <Typography 
                    variant="h6" 
                    sx={{ 
                        fontWeight: 700, 
                        fontSize: '15px',
                        color: '#242a41',
                        mb: 0.5,
                        lineHeight: 1.2,
                        overflow: 'visible',
                        wordBreak: 'break-word'
                    }}
                >
                    {name}
                </Typography>
                {position && (
                    <Chip 
                        label={position} 
                        size="small" 
                        sx={{ 
                            height: 24,
                            fontSize: '12px',
                            fontWeight: 600,
                            backgroundColor: '#007bff',
                            color: 'white',
                            mb: 1
                        }}
                    />
                )}
                {educationLevel && (
                    <Typography 
                        variant="caption" 
                        sx={{ 
                            display: 'block',
                            color: '#666',
                            fontSize: '11px',
                            fontWeight: 500
                        }}
                    >
                        {educationLevel}
                    </Typography>
                )}
            </CardContent>
            <a 
                className="FeaturedMemberPreview uk-inline" 
                href={profilePhoto} 
                data-type="image" 
                data-caption={shortDescription || name}
            >
                <Box className="PreviewOverlay">
                    <i className="fas fa-eye" style={{ color: '#fff', fontSize: '24px' }}></i>
                    <Typography variant="caption" sx={{ color: '#fff', mt: 1, fontWeight: 600 }}>Preview</Typography>
                </Box>
            </a>
        </Card>
    );
};

export default HomeSingleTeamMember;