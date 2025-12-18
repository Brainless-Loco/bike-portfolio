import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './Home.css';
import About from '../../Components/Home/AboutSection/About';
import Count from '../../Components/CountSection/Count';
import HomeCurrentResearchers from '../../Components/Home/HomeCurrentTeam/HomeCurrentTeam';
import OthersComments from '../../Components/Home/OthersComments/OthersComment';
import ContactUs from '../../Components/Home/ContactUs/ContactUs';
import ActivitiesTimeline from '../../Components/Home/ActivitiesTimeline/ActivitiesTimeline';

const Home = ({setNonHomePath}) => {

    useEffect(()=>{
        setNonHomePath(false)
    
    },[setNonHomePath])

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.async = true;
        script.onload = () => {
            if (window.particlesJS) {
                window.particlesJS('homeBackground', {
                    particles: {
                        number: {
                            value: 80,
                            density: {
                                enable: true,
                                value_area: 900
                            }
                        },
                        color: {
                            value: '#016DB2'
                        },
                        shape: {
                            type: 'circle'
                        },
                        opacity: {
                            value: 0.9,
                            random: false
                        },
                        size: {
                            value: 8, // increased node diameter
                            random: true
                        },
                        line_linked: {
                            enable: true,
                            distance: 150,
                            color: '#016DB2',
                            opacity: 0.7,
                            width: 2 // slightly thicker connector lines
                        },
                        move: {
                            enable: true,
                            speed: 1,
                            direction: 'none',
                            random: false,
                            straight: false,
                            out_mode: 'out',
                            bounce: false
                        }
                    },
                    interactivity: {
                        detect_on: 'canvas',
                        events: {
                            onhover: {
                                enable: true,
                                mode: 'grab'
                            },
                            onclick: {
                                enable: true,
                                mode: 'push'
                            },
                            resize: true
                        },
                        modes: {
                            grab: {
                                distance: 200,
                                line_linked: {
                                    opacity: 1
                                }
                            },
                            push: {
                                particles_nb: 4
                            }
                        }
                    },
                    retina_detect: true
                });
            }
        };
        document.head.appendChild(script);

        return () => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, [])
    
    return (
        <div>
            <Helmet>
                <title> BIKE - CSE CU</title>
            </Helmet>
            <div className="home-first">
                <div id='homeBackground'></div>
                <div className="middle-center text-center">
                    <h1 className="text-white pb-0">Welcome to BIKE CSE CU Lab</h1>
                    <p className="Welcome-note">
                        Big Data, Information, and Knowledge Engineering Lab
                    </p>
                    <br/>
                    {/* <Link to="/Join-us" className="join-us-button">Connect with us</Link> */}
                </div>
                
            </div>
            <About/>
            <Count/>
            {/* <HomeEvents/> */}
            <HomeCurrentResearchers/>
            <ActivitiesTimeline />
            <OthersComments/>
            <ContactUs/>
        </div>
    );
};

export default Home;