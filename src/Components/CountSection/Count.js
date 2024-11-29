import React from 'react';
import './Count.css';
import CountEachSection from './CountEach/CountEachSection';

const Count = () => {
    return (
        <div className="count-section">
            <h1 className="text-white display-4 text-center font-weight-bold">Till Now</h1>
            <div className="row text-center">
                <CountEachSection EndCount={10} Name="Active Researchers" />
                <CountEachSection EndCount={10} Name="Research Publications" />
                <CountEachSection EndCount={10} Name="Ongoing Researches" />
            </div>
            
        </div>
    );
};

export default Count;