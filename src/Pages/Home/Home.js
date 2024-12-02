import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './Home.css';
import $ from "jquery";
import About from '../../Components/Home/AboutSection/About';
import Count from '../../Components/CountSection/Count';
import HomeCurrentResearchers from '../../Components/Home/HomeCurrentResearchers/HomeCurrentResearchers';
import OthersComments from '../../Components/Home/OthersComments/OthersComment';
import ContactUs from '../../Components/Home/ContactUs/ContactUs';

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
            <HomeCurrentResearchers/>
            <OthersComments/>
            <ContactUs/>
        </div>
    );
};

export default Home;