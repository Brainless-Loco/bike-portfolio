import React from 'react';
import './Count.css';
import CountEachSection from './CountEach/CountEachSection';

const Count = () => {
    return (
        <div className="count-section">
            <h1 className="text-white display-4 text-center font-weight-bold">Till Now</h1>
            <div className="row text-center">
                <CountEachSection shortDescrption={"A dynamic team driving innovation across diverse scientific fields."}  EndCount={15} Name="Active Researchers" />
                <CountEachSection shortDescrption={"Published works contributing to cutting-edge advancements."}  EndCount={35} Name="Research Publications" />
                <CountEachSection shortDescrption={"Exploring new frontiers with groundbreaking studies in progress."}  EndCount={5} Name="Ongoing Researches" />
            </div>
            
        </div>
    );
};

export default Count;