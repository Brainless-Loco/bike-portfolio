import React from 'react';
import './HomeEvents.css';
import { Link } from 'react-router-dom';
import { Timeline }  from 'vertical-timeline-component-for-react';
import AnEventDiv from '../HomeEvent/AnEventDiv';

const HomeEvents = () => {
    return (
        <div className="EventTimeLine py-5 col-md-11 mx-auto text-center">
            <h1 className="h1 text-center mb-0">Recent Acitivities</h1>

            <Timeline className="py-1 mt-4 mb-5">
                <AnEventDiv/>
                <AnEventDiv/>
                <AnEventDiv/>
                <AnEventDiv/>
            </Timeline>

            <Link to="/Events" className="see-all-button mt-0">See All</Link>
        </div>
    );
};

export default HomeEvents;