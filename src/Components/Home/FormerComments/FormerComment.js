import React from 'react';
import OneComment from '../OneComment/OneComment';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import './FormerComment.css';

// SwiperCore.use([Pagination]);


const FormerComment = () => {
    return (
        <div className="container-fluid text-center swiper-container formersNoteSection">
            <h1 className="text-white glipse-title pt-3">What Others Say about BIKE </h1>

            <Swiper className="mySwiper" slidesPerView='auto' pagination={{"clickable":true}}>

                {/* Ekhane ekta map cholbe Json Data er upore and OneComment e props jabe */}

                <SwiperSlide  className="NoteSlide"><OneComment/></SwiperSlide>
                <SwiperSlide  className="NoteSlide "><OneComment/></SwiperSlide>
                <SwiperSlide  className="NoteSlide"> <OneComment/></SwiperSlide>
                <SwiperSlide  className="NoteSlide"><OneComment/></SwiperSlide>
                <SwiperSlide  className="NoteSlide"> <OneComment/></SwiperSlide>
                <SwiperSlide  className="NoteSlide"><OneComment/></SwiperSlide>

            </Swiper>
            
            <br/>
        </div>
    );
};

export default FormerComment;