import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import './Home.css';
import About from '../../Components/Home/AboutSection/About';
import Count from '../../Components/CountSection/Count';
import HomeCurrentResearchers from '../../Components/Home/HomeCurrentTeam/HomeCurrentTeam';
import OthersComments from '../../Components/Home/OthersComments/OthersComment';
import ContactUs from '../../Components/Home/ContactUs/ContactUs';
import ActivitiesTimeline from '../../Components/Home/ActivitiesTimeline/ActivitiesTimeline';
import { Box, Typography } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Utils/Firebase';

const particles = {
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
}

const interactivity = {
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
}

const Home = ({ setNonHomePath }) => {
    const [newsData, setNewsData] = useState(null);
    const [isNewsValid, setIsNewsValid] = useState(false);

    useEffect(() => {
        setNonHomePath(false)
    }, [setNonHomePath])

    // Fetch news from Firebase
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const docRef = doc(db, 'ScrollingNews', 'scrollingNews');
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setNewsData(data);
                    
                    // Check if news is within valid date range
                    if (data.title && data.startDateTime && data.endDateTime) {
                        const now = new Date();
                        const startDate = new Date(data.startDateTime);
                        const endDate = new Date(data.endDateTime);
                        
                        const isValid = now >= startDate && now <= endDate;
                        setIsNewsValid(isValid);
                    }
                }
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };
        
        fetchNews();
    }, [])

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.async = true;
        script.onload = () => {
            if (window.particlesJS) {
                window.particlesJS('homeBackground', {
                    particles: particles,
                    interactivity: interactivity,
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

            {/* Hot News Banner - Show only if valid news exists and within date range */}
            {isNewsValid && newsData && (
                <Box
                    onClick={() => {
                        if (newsData.link) {
                            window.open(newsData.link, '_blank');
                        }
                    }}
                    sx={{
                        width: '100%',
                        margin: 'auto',
                        backgroundColor: '#e53935',
                        color: 'white',
                        padding: '14px 0',
                        position: 'absolute',
                        top: 90,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        overflow: 'hidden',
                        zIndex: 100,
                        boxShadow: '0 4px 12px rgba(229, 57, 53, 0.25)',
                        border: 'none',
                        cursor: newsData.link ? 'pointer' : 'default',
                        transition: 'box-shadow 0.3s ease',
                        '&:hover': {
                            boxShadow: '0 8px 24px rgba(229, 57, 53, 0.35)',
                        }
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            animation: `scroll-left ${newsData.speed || 30}s linear infinite`,
                            whiteSpace: 'nowrap',
                            paddingX: '20px',
                            '&:hover': {
                                animationPlayState: 'paused',
                            }
                        }}
                    >
                        <Typography 
                            variant="body1"
                            sx={{
                                fontSize: '15px',
                                fontWeight: '500',
                                letterSpacing: '0.3px',
                                opacity: 0.95
                            }}
                        >
                            {newsData.title}
                        </Typography>
                        {newsData.link && (
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    ml: 2,
                                    fontWeight: '600',
                                    fontSize: '14px',
                                    opacity: 0.9,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}
                            >
                                Know More &#8594;
                            </Typography>
                        )}
                    </Box>
                    <style>{`
                        @keyframes scroll-left {
                            0% {
                                transform: translateX(100%);
                            }
                            100% {
                                transform: translateX(-100%);
                            }
                        }
                    `}</style>
                </Box>
            )}

            <div className="home-first">
                <div id='homeBackground'></div>
                <div className="middle-center text-center">
                    <h1 className="text-white pb-0 welcome-heading">Welcome to <span className="highlighted-text">BIKE CSE CU Lab</span> </h1>
                    <p className="Welcome-note">
                        Big Data, Information, and Knowledge Engineering Lab
                    </p>
                    <br />
                    {/* <Link to="/Join-us" className="join-us-button">Connect with us</Link> */}
                </div>

            </div>
            <About />
            <Count />
            {/* <HomeEvents/> */}
            <HomeCurrentResearchers />
            <ActivitiesTimeline />
            <OthersComments />
            <ContactUs />
        </div>
    );
};

export default Home;