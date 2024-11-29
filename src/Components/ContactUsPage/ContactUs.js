import React, { useState } from 'react';
import './JoinUs.css';
import $ from 'jquery';
import { Strings } from '../../Utilities/Constants';
import { Helmet } from 'react-helmet';

const ContactUs = () => {
    // States
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [message, setMessage] = useState('');
    const [phone, setPhone] = useState('');
    const [previewImageURL, setPreviewImageURL] = useState(Strings.placeholder_image_link);
    // const [previewImageFile, setPreviewImageFile] = useState(null);

    // Handlers
    const handleImageUpload = (e) => {
        if(e.target.files && e.target.files[0]) {
            let img = e.target.files[0];

            setPreviewImageURL(URL.createObjectURL(img));
            // setPreviewImageFile(img);
        }
    }

    const handleSubmitButton = (firstName, lastName, message, phone, imageLink) => {
        const formInfo = {
            firstName: firstName,
            lastName: lastName,
            message: message,
            phone: phone,
            imageLink: imageLink,
        };
        
        console.log(formInfo);
    }

    $('.header').addClass("bg-color-1");
    $('.header .logo').addClass("bg-color-1");

    // Markup
    return (
        <div className="join-us-page">
            {/* TODO: Implement photo upload function here.
                Upload the photo to firestore and keep a reference of it in firestore.*/}
            <Helmet>
                <title>Contact BIKE | BIKE</title>
            </Helmet>
            <h1 className="display-4 mt-0 font-weight-bold text-color1 text-center py-2">Contact BIKE</h1>
            <div className='row mx-5 mb-5' style={{display:'flex',justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
                <div className="join-us-banner mx-auto col-11 col-md-9 col-lg-4">
                    <img src="https://i.postimg.cc/G3vvRqvQ/image.png" style={{borderRadius:'10px'}} alt="" srcset="" />
                </div>
                <p className="why-join-us text-left mx-2 px-2 mx-auto col-11 col-md-9 col-lg-8">
                    <h2 style={{fontWeight:'500'}}>About the Director</h2>
                    <p>Dr. Rudra Pratap Deb Nath is working as an associate professor in the <a target="_blank" rel="noopener noreferrer" href="https://cu.ac.bd/cse">Department of Computer Science and Engineering</a> at <a target="_blank" rel="noopener noreferrer" href="https://cu.ac.bd/">University of Chittagong</a>, Chattogram Bangladesh and the director of BIKE: Big Data, Information, and Knowledge Engineering Lab.</p>
                    <p>He earned his Ph.D. titles from <a target="_blank" rel="noopener noreferrer" href="https://www.en.aau.dk/">Aalborg University</a>, Denmark and <a target="_blank" rel="noopener noreferrer" href="https://www.essi.upc.edu/dtim/">Universitat Politècnica</a> de Catalunya (UPC), Spain with the prestigious <strong>Erasmus Mundus Scholarship</strong> under the consortium of <a target="_blank" rel="noopener noreferrer" href="https://it4bi-dc.ulb.ac.be/">IT4BI-DC: Information Technology for Business Intelligence Doctoral College</a>. His Ph.D. thesis title is "<a target="_blank" rel="noopener noreferrer" href="https://vbn.aau.dk/en/publications/aspects-of-semantic-etl">Aspects of Semantic ETL</a>", where they proposed and developed an ontology-based semantic ETL tool that integrates semantic and non-semantic data into a semantic data warehouse and enables OLAP queries on it. He did his Master of Engineering in Toyohashi University of Technology Japan with the prestigious <strong>MEXT scholarship</strong>.</p>
                    <p><strong>Nature</strong>: As a person, he is disciplined, professional, honest, humble, and friendly.</p>
                    <p><strong>Hobby and Interest</strong>: Self Exploration and Realization, Singing, Instrument Playing, Dancing (Mostly Latin American styles: Salsa, Bachata, Zouk, Kizomba, Cha cha cha, and contemporary), Karate, and Cooking.&nbsp;</p>
                </p>
            </div>
            
            <form  uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                <label className="col-md-8 col-lg-7 col-xl-6 py-2 my-2">
                    <input 
                        type='text' 
                        required 
                        value={firstName} placeholder="First Name"
                        onChange={(e) => setFirstName(e.target.value)}></input>
                </label>
                <label className="col-md-8 col-lg-7 col-xl-6 py-2 my-2">
                    <input 
                        type='text' 
                        required
                        value={lastName} placeholder="Last Name"
                        onChange={(e) => setLastName(e.target.value)}></input>
                </label>
                {/* <label className="col-md-8 col-lg-7 col-xl-6 py-2 my-2">
                    <input
                        type='text'
                        value={gender} placeholder="Gender"
                        onChange={(e) => setGender(e.target.value)}></input>
                </label>
                <label className="col-md-8 col-lg-7 col-xl-6 py-2 my-2">
                    <input 
                        type='text'
                        value={department} placeholder="Department"
                        onChange={(e) => setDepartment(e.target.value)}></input>
                </label>
                <label className="col-md-8 col-lg-7 col-xl-6 py-2 my-2">
                    <input 
                        type='text'
                        value={session} placeholder="Session"
                        onChange={(e) => setSession(e.target.value)}></input>
                </label>
                <label className="col-md-8 col-lg-7 col-xl-6 py-2 my-2">
                    <input 
                        type='number'
                        value={studentID} placeholder="Student ID"
                        onChange={(e) => setStudentID(e.target.value)}></input>
                </label> */}
                <label className="col-md-8 col-lg-7 col-xl-6 py-2 my-2">
                    <input
                        type='text'
                        value={phone}  placeholder="Contact No."
                        onChange={(e) => setPhone(e.target.value)}></input>
                </label>
                {/* <label className="col-md-8 col-lg-7 col-xl-6 py-2 my-2">
                    <input 
                        type='text'
                        value={bloodGroup} placeholder="Blood Group"
                        onChange={(e) => setBloodGroup(e.target.value)}></input>
                </label> */}
                <label className="col-md-8 col-lg-7 col-xl-6 py-2 my-2">
                    <textarea
                        type='text'
                        value={message}  placeholder="Message"
                        onChange={(e) => setMessage(e.target.value)}></textarea>
                </label>
                <div className="col-md-8 mx-auto col-lg-7 col-xl-6 py-2 my-2">
                    <div className="profile-img mx-auto">
                        <img 
                            src={previewImageURL}
                            alt='preview-selected'></img>
                        <input 
                        type='file' accept=".jpg, .jpeg, .png, .PNG, .JPG, .JPEG"
                        onChange={handleImageUpload} placeholder="Upload"></input>
                        
                    </div>
                    <p className="text-color1 h6 my-0">Click on Image to upload or change</p>
                </div>
                <button 
                    type='button' 
                    className="join-us-button"
                    onClick={(e) => {
                        handleSubmitButton(firstName, lastName, message, phone,
                                previewImageURL);
                        }
                    }>Submit</button>
            </form>
        </div>
    );  
};


export default ContactUs;


