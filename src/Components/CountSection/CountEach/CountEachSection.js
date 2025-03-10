import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import './CountEachSection.css';

const CountEachSection = (props) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 1.0 });

    return (
        <div ref={ref} className="eachCount mx-auto">
            <p className="countUp mb-0">
                {inView && <CountUp start={0} end={props.EndCount} duration={1.5} />}+
            </p>
            <h1 className="text-white mt-0 countTitle">{props.Name}</h1>
            <p className="countDesc">{props.shortDescrption}</p>
        </div>
    );
};

export default CountEachSection;
