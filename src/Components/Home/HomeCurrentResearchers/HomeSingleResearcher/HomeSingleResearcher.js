import React from 'react';
import './HomeSingleResearcher.css';

const HomeEachMemory = (props) => {
    return (
        <div className="EachResearcher mb-4 mx-3" >
            <img src={props.imageURL} alt=""/>
            <p className="ResearcherName py-0 my-0">Name of the Researcher</p>
            <a className="uk-inline ResearcherDescDiv" href={props.imageURL} data-type="image" data-caption={props.Caption} /* Ekhane Caption or behind the story Hobe */>
                <div className="ResearcherDescription">
                    <p className="title py-0 my-0">Name of the Researcher</p>
                    <p className="date py-0 mt-1">A Rank</p>
                    <p className="text-white my-0"> <i className="fas fa-link"></i> Preview </p>
                </div>
            </a>
        </div>
    );
};

export default HomeEachMemory;