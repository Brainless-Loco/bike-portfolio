import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './Home.css';
import $ from "jquery";
import About from '../AboutSection/About';
import Count from '../CountSection/Count';
import HomeMemories from '../HomeCurrentResearchers/CurrentResearchers';
import FormerComment from '../FormerComments/FormerComment';
import ContactUs from '../ContactUs/ContactUs';


const Home = () => {
    $('.header').removeClass("bg-color-1");
    $('.header .logo').removeClass("bg-color-1");
    return (
        <div>
            <Helmet>
                <title> BIKE - CSE CU</title>
            </Helmet>
            <div id='homeBackground' className="home-first">
                <div className="middle-center text-center">
                    <h1 className="text-white pb-0">Welcome to BIKE CSE CU Lab</h1>
                    <p className="Welcome-note">
                        Big Data, Information, and Knowledge Engineering Lab
                    </p>
                    <br/>
                    <Link to="/Join-us" className="join-us-button">Connect with us</Link>
                </div>
                
            </div>
            <About/>
            <Count/>
            {/* <HomeEvents/> */}
            <HomeMemories/>
            <FormerComment/>
            <ContactUs/>
        </div>
    );
};

export default Home;