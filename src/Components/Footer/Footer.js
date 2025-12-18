import React from 'react';
import './Footer.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <Box className="footerDiv text-white">
            <Box className="row text-center mt-4">
                <Box className="col-md-5 mx-auto px-md-5 text-left float-left">
                    <img src="Image/logo.png" className="footerLogo mt-2" alt="" />
                    <h2 className="text-white mt-1 py-0 h2">Big Data, Information and Knowledge Engineering</h2>
                    <p className="my-1 py-0">
                        Advancing data-driven solutions by integrating, analyzing, and exploring Big (Linked) Data for intelligent decision-making.
                    </p>
                </Box>
                <Box className="col-md-5 mx-auto px-md-5 mt-5 text-left float-left">
                    <Typography variant='h5' className="text-white mb-4">Important Links</Typography>
                    <Link to="/Vacancies" className="footerLinks" target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-briefcase"></i> Career
                    </Link>
                    <Link to="mailto::contact@bike-csecu.com" className="footerLinks" target="_blank" rel="noopener noreferrer"><i className="fas fa-at"></i> Email</Link>
                    <Link to="https://www.youtube.com/channel/UCFHW8AK9v-5A51AMmcqeHnA" className="footerLinks" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i> Youtube</Link>
                    <Link to="https://www.facebook.com/groups/498871573515526" className="footerLinks" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-square"></i> Facebook Page</Link>
                    <Link to="https://www.facebook.com/groups/498871573515526" className="footerLinks" target="_blank" rel="noopener noreferrer"><i className="fas fa-users"></i> Facebook Community</Link>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;