import React, { useEffect, useState } from 'react';
import OneComment from './OneComment/OneComment';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import './OthersComments.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../Utils/Firebase';
import { CircularProgress } from '@mui/material';

// SwiperCore.use([Pagination]);


const OthersComments = () => {

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "OthersComments"));
            const commentsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            }));
            setComments(commentsData);
        } catch (error) {
            console.error("Error fetching comments:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchComments();
    }, []);

    if (loading) return <CircularProgress size={50} sx={{color:'rgba(19, 45, 122)', mx:'auto', my:'auto'}} />;


    return (
        <div className="container-fluid text-center swiper-container formersNoteSection">
            <h1 className="text-white glipse-title pt-3">What Others Say about BIKE </h1>

            <Swiper className="mySwiper" slidesPerView='auto' pagination={{"clickable":true}}>

                {/* Ekhane ekta map cholbe Json Data er upore and OneComment e props jabe */}
                {
                    comments.map(comment => ( 
                                <SwiperSlide key={comment.id} className="NoteSlide">
                                    <OneComment commentInfo={comment}/>
                                </SwiperSlide>
                    ))
                }

            </Swiper>
            
            <br/>
        </div>
    );
};

export default OthersComments;