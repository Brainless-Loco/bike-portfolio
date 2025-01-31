import React from 'react';
import './Footer.css';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box className="footerDiv text-white">
            <Box className="row text-center mt-4">
                <Box className="col-md-5 mx-auto px-md-5 text-left float-left">
                    <img src="Image/logo.png" className="footerLogo" alt="" />
                    <h2 className="text-white mt-1 py-0 h2">Big Data, Information and Knowledge & Engineering</h2>
                    <p className="my-1 py-0">
                        Advancing data-driven solutions by integrating, analyzing, and exploring Big (Linked) Data for intelligent decision-making.
                    </p>
                </Box>
                <Box className="col-md-5 mx-auto px-md-5 mt-5 text-left float-left">
                    <Typography variant='h5' className="text-white mb-4">Important Links</Typography>
                    <a href="http://" className="footerLinks" target="_blank" rel="noopener noreferrer"><i className="fas fa-at"></i> Email</a>
                    <a href="http://" className="footerLinks" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i> Youtube</a>
                    <a href="http://" className="footerLinks" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-square"></i> Facebook Page</a>
                    <a href="http://" className="footerLinks" target="_blank" rel="noopener noreferrer"><i className="fas fa-users"></i> Facebook Community</a>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;