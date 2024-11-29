import React from 'react';
import CountUp from 'react-countup';
import './CountEachSection.css';

const CountEachSection = (props) => {
    return (
        <div className="eachCount mx-auto">
            <p className="countUp mb-0"><CountUp start={0} end={props.EndCount} duration={15} />+</p>
            <h1 className="text-white mt-0 countTitle">{props.Name}</h1>
            <p className="countDesc">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi ab facere beatae veritatis minima voluptate?
            </p>
        </div>
    );
};

export default CountEachSection;