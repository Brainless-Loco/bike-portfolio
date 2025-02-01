import React from 'react';
import './OneComment.css';

const OneComment = ({commentInfo}) => {
    return (
        <>
            <img className="profilePic" src={commentInfo.photo} alt=""/>
            <h3 className="my-0 py-0 FormerName">{commentInfo.name}</h3>
            <p className="my-0 py-0 FormerRank">{commentInfo.recognition}</p>
            <p className="text-center text-white mt-1">
                <i className="fas fa-quote-left quotoSign mr-2"></i>
                {commentInfo.comment}
                <i className="fas fa-quote-right quotoSign ml-2"></i>
            </p>
            
        </>
    );
};

export default OneComment;