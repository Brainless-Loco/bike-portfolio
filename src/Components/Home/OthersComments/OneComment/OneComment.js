import React from 'react';
import './OneComment.css';

const OneComment = () => {
    return (
        <>
            <img className="profilePic" src="./Image/logo.png" alt=""/>
            <h3 className="my-0 py-0 FormerName">Name of the Commentor</h3>
            <p className="my-0 py-0 FormerRank">Rank of the Commentor</p>
            <p className="text-center text-white mt-1">
                <i className="fas fa-quote-left quotoSign mr-2"></i>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam eos sit animi iure fugit sed eum reprehenderit ea optio a?
                <i className="fas fa-quote-right quotoSign ml-2"></i>
            </p>
            
        </>
    );
};

export default OneComment;