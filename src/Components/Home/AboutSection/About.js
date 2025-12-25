import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-section">
            <div className="col-12 text-center mb-4">
                    <h1 className="text-left display-4 mb-2 font-weight-bold" style={{ color: '#102772', borderBottom: '4px solid #102772', fontSize: '32px' }}>
                        About BIKE Lab
                    </h1>
                    <p className="about-desc text-justify" style={{ fontSize: '18px' }}>
                        Besides natural resources like land, oil, capital, and labor, data plays a key role in modern economic production and has become a raw material for business.
                        Industry 4.0 is shifting towards a data-driven society. The value of data gets unlocked when it is semantically integrated and analytically explored to derive intelligent decisions.
                    </p>
                    <p className="about-desc text-justify" style={{ fontSize: '18px' }}>
                        The <strong>BIKE</strong> research group in the <strong>Computer Science and Engineering Department, University of Chittagong</strong>
                        conducts research in the fields of data, information, and knowledge engineering, with an emphasis on the data/information/knowledge lifecycle within data-intensive systems.
                        Our primary focus areas include <strong>Big (Linked) data management, integration, analysis, knowledge graph generation, and exploration</strong>.
                    </p>
                </div>
            <div className="row inner-div-of-about-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                

                <div className="col-lg-4 p-4">
                    <img src="./Image/logo.png" className="about-image" alt="BIKE Logo" />
                </div>
                <div className="col-lg-8">

                    <div className="info-section mt-4 p-4" style={{ backgroundColor: "#f4f6f9", borderLeft: "5px solid #102772", borderRadius: "8px", fontSize: '20px', fontWeight: 500 }}>
                        <p><strong style={{ color: "#0c2461", fontWeight: 800 }}>Vision:</strong> Providing data-driven solutions for societal challenges.</p>
                        <p><strong style={{ color: "#0c2461", fontWeight: 800 }}>Mission:</strong> BIKE conducts research, ranging from near-term applicability to exploratory research. We:</p>
                        <ul style={{ listStyle: 'square' }}>
                            <li> Are passionate and committed to going the extra mile.</li>
                            <li> Seek collaboration.</li>
                            <li> Provide trustworthy and sustainable solutions to stakeholders.</li>
                        </ul>
                    </div>

                    <div className="info-section mt-4 p-4" style={{ backgroundColor: "#f4f6f9", borderLeft: "5px solid #102772", borderRadius: "8px", fontSize: '18px' }}>
                        <p><strong style={{ color: "#0c2461", fontWeight: 800 }}> Research Areas:</strong> We focus on the following key areas:</p>
                        <ul style={{ listStyle: 'square' }}>
                            <li><strong style={{ color: "#0c2461", fontWeight: 700 }}>Semantic Data Integration:</strong> Enabling seamless integration of heterogeneous data sources.</li>
                            <li><strong style={{ color: "#0c2461", fontWeight: 700 }}>Knowledge Graph Exploration:</strong> Creating and exploring structured knowledge representations.</li>
                            <li><strong style={{ color: "#0c2461", fontWeight: 700 }}>Enabling Semantic Integration Over Bangladesh Open Data:</strong> Connecting and enriching national open data.</li>
                            <li><strong style={{ color: "#0c2461", fontWeight: 700 }}>Business Analytics Over COVID-19 Data:</strong> Creating a multidimensional semantic data warehouse and enabling OLAP-style analysis over COVID-19 data.</li>
                            <li><strong style={{ color: "#0c2461", fontWeight: 700 }}>Sentiment Analysis:</strong> Extracting insights from textual data to understand public perception.</li>
                            <li><strong style={{ color: "#0c2461", fontWeight: 700 }}>Data-Intensive Systems:</strong> Handling large-scale data processing and storage challenges.</li>
                            <li><strong style={{ color: "#0c2461", fontWeight: 700 }}>Time Series Data Analysis:</strong> Analyzing and predicting trends over time using complex datasets.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default About;