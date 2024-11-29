import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footerDiv text-white">
            <div className="row text-center mt-4">
                <div className="col-md-5 mx-auto px-md-5 text-left float-left">
                    <img src="Image/logo.png" className="footerLogo" alt="" />
                    <h2 className="text-white mt-1 py-0 h2">Big Data, Information and Knowledge & Engineering</h2>
                    <p className="my-1 py-0">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo harum sequi est autem, impedit veniam!
                    </p>
                </div>
                <div className="col-md-5 mx-auto px-md-5 mt-5 text-left float-left">
                    <h4 className="h4 text-white mb-4">Important Links</h4>
                    <a href="http://" className="footerLinks" target="_blank" rel="noopener noreferrer"><i className="fas fa-at"></i> Email</a>
                    <a href="http://" className="footerLinks" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i> Youtube</a>
                    <a href="http://" className="footerLinks" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-square"></i> Facebook Page</a>
                    <a href="http://" className="footerLinks" target="_blank" rel="noopener noreferrer"><i className="fas fa-users"></i> Facebook Community</a>
                </div>
            </div>
        </div>
    );
};

export default Footer;