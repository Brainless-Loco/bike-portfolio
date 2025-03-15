import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../Images/Logo/logo.svg';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({isScrolled, nonHomePath}) => {
    const menuList = ["Home","Director","Publications","Projects","Team","Partners", "Vacancies", "Latest"]

    const [isMenuOpenInMobile, setIsMenuOpenInMobile] = useState(false)


    return (
        <Box className={`header ${isScrolled || nonHomePath ? "bg-color-1 scrollChange" : ""}`}>
            <Link to="/"><img className="logo" style={{display:isMenuOpenInMobile && 'none'}} src={logo} alt="logo"/></Link>
            <Box className={!isMenuOpenInMobile && "text-md-right "}>
                <ul className={"menu"} style={{display:isMenuOpenInMobile&&"flex"}}>
                    <Box className="mx-auto text-center w-100" sx={{display:isMenuOpenInMobile?'block':'none'}}>
                        <img className="mobile-menu-logo mx-auto" width="120px" src={logo} alt="logo"/>
                        <hr className="mt-3 mx-auto w-75"/>
                    </Box>
                    {
                     menuList.map(LinkName => <li button onClick={()=>{
                        isMenuOpenInMobile && setIsMenuOpenInMobile(!isMenuOpenInMobile)
                     }} key={LinkName} className="ml-0"><Link to={"/"+LinkName} className="menu-btn">{LinkName}</Link></li>)
                    }
                </ul>
                <Box  className="py-2 hambar float-right" sx={{display:!isMenuOpenInMobile?'none':'block'}}>
                    <MenuIcon button onClick={()=>{setIsMenuOpenInMobile(!isMenuOpenInMobile)}} sx={{fontSize:'40px', color:'white', cursor:'pointer'}} color="white" />
                </Box>
            </Box>
        </Box>
    );
};

export default Header;