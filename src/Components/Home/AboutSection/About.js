import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-section">
            <div className="row inner-div-of-about-section" style={{display:'flex',alignItems:'middle',justifyContent:'center'}}>
                <div className="col-lg-4" >
                    <img src="./Image/logo.png" className="about-image" alt=""/>
                </div>
                <div className="col-lg-8">
                    <h1 className="text-left display-4 mb-2 font-weight-bold" style={{color:'#102772',borderBottom:'4px solid #102772'}}>About BIKE </h1>
                    <p className="about-desc text-justify">
                        Besides natural resources like land, oil, capital, labor, Data play a key role in modern economic production and become a raw material of business. Industry 4.0 shifting towards data-driven society. The values of data gets unlocked when it is semantically integrated and analytically explored to derive intelligent decisions. <br/><br/>
                        The BIKE research group in Computer Science and Engineering Department, University of Chittagong conducts research in the fields of data, information and knowledge engineering, with emphasis on the data/information/knowledge lifecycle within data-intensive systems. Here, we mainly focus on Big (Linked) data management, integration, analysis, knowledge graph generation and exploration.


                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;