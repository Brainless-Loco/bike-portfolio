import React from 'react';
import { Link } from 'react-router-dom';
import './ContactUs.css';

const ContactUs = () => {
    return (
        <div className="row w-100 text-center px-md-5 px-3 contactUs">
            <div className="col-md-6 mb-md-0 mb-3 float-left text-left" uk-scrollspy="cls: uk-animation-slide-left; delay:500; repeat: false">
                <h1 className="h1 text-color1">Get In Touch</h1>
                <p className="contact-us-text text-dark">
                    Questions about our research, collaboration opportunities, or anything else regarding the BIKE research group? We're here to help. Your inquiries are important to us, and we're eager to connect. Feel free to reach out, and let's explore the possibilities in data, information, and knowledge engineering together.
                </p>
                <div className="text-dark ml-3 px-2">
                    <h1 className="d-inline h1 text-color1 mr-3"> <i className="fas fa-envelope"></i> </h1> <a href="mailto::bikecsecu@gmail.com" className="h2 text-color1">bikecsecu@gmail.com</a>
                    <br/> <br />
                    <h1 className="d-inline h1 text-color1 mr-3"> <i className="fab fa-facebook"></i> </h1> <a href="mailto::bikecsecu@gmail.com" className="h2 text-color1">BIKE Lab Official Group</a>
                </div> 
            </div>
            <div className="col-md-6"  uk-scrollspy="cls: uk-animation-slide-right; delay:500; repeat: false">
                <form action="" className="ml-0">
                    <input type="text" className="contactUsTextInput" placeholder="Name" name="" id="" />
                    <input type="text" className="contactUsTextInput" placeholder="Email" name="" id="" />
                    <textarea name="" id="" className="contactUsMessageInput contactUsTextInput" placeholder="Message"></textarea>
                    <Link to="/join-us" type="submit" className="join-us-button">Send Message</Link>
                </form>
            </div>

        </div>
    );
};

export default ContactUs;