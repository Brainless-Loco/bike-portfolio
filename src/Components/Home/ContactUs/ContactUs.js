import React, { useState } from 'react';
import './ContactUs.css';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../../Utils/Firebase';
import { CircularProgress } from '@mui/material';

const ContactUs = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleSubmit = async () => {
        if (!name.trim() || !email.trim() || !message.trim()) {
          alert("Please fill in all fields.");
          return;
        }
      
        setIsSubmitting(true);
        
        try {
          const newMessage = {
            name,
            email,
            message,
            createdAt: Timestamp.now(), // Store the submission time
          };
      
          await addDoc(collection(db, "ContactMessages"), newMessage);
          
          alert("Your message has been sent successfully!");
          
          // Reset form fields after submission
          setName('');
          setEmail('');
          setMessage('');
        } catch (error) {
          console.error("Error sending message:", error);
          alert("An error occurred while sending your message.");
        } finally {
          setIsSubmitting(false);
        }
      };

    return (
        <div className="row w-100 text-center px-md-5 px-3 contactUs">
            <div className="col-md-6 mb-md-0 mb-3 float-left text-left" uk-scrollspy="cls: uk-animation-slide-left; delay:500; repeat: false">
                <h1 className="h1 text-color1">Get In Touch</h1>
                <p className="contact-us-text text-dark">
                    Questions about our research, collaboration opportunities, or anything else regarding the BIKE research group? We're here to help. Your inquiries are important to us, and we're eager to connect. Feel free to reach out, and let's explore the possibilities in data, information, and knowledge engineering together.
                </p>
                <div className="text-dark ml-3 px-2">
                    <h1 className="d-inline h1 text-color1 mr-3"> <i className="fas fa-envelope"></i> </h1> <a href="mailto::bikecsecu@gmail.com" className="h2 text-color1">bikecsecu@gmail.com</a>
                    <br/> <br />
                    <h1 className="d-inline h1 text-color1 mr-3"> <i className="fab fa-facebook"></i> </h1> <a href="mailto::bikecsecu@gmail.com" className="h2 text-color1">BIKE Lab Official Group</a>
                </div> 
            </div>
            <div className="col-md-6"  uk-scrollspy="cls: uk-animation-slide-right; delay:500; repeat: false">
                <form action="" className="ml-0">
                    <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" className="contactUsTextInput" placeholder="Name" name="" id="" />
                    <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" className="contactUsTextInput" placeholder="Email" name="" id="" />
                    <textarea value={message} onChange={(e)=>{setMessage(e.target.value)}} name="" id="" className="contactUsMessageInput contactUsTextInput" placeholder="Message"></textarea>
                    <div onClick={()=>{handleSubmit()}} className="join-us-button mx-auto" style={{width:'50%',}}>
                        {isSubmitting? <CircularProgress size={20} sx={{color:'blue'}}/> : "Send Message"}
                    </div>
                </form>
            </div>

        </div>
    );
};

export default ContactUs;