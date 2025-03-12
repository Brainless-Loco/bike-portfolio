import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../Images/Logo/logo.svg';
import Box from '@mui/material/Box';

const Header = ({isScrolled, nonHomePath}) => {
    const menuList = ["Home","Director","Publications","Projects","Team","Partners", "Vacancies", "Latest"]

    return (
        <Box className={`header ${isScrolled || nonHomePath ? "bg-color-1 scrollChange" : ""}`}>
            <Link to="/"><img className="logo" src={logo} alt="logo"/></Link>
            <Box className="text-md-right">
                <ul className="menu ml-0 mb-5 pr-1">
                    <Box className="col-10 mx-auto">
                        <img className="menu-btn mx-auto" width="120px" src={logo} alt="logo"/>
                        <hr className="menu-btn mt-3 mx-auto"/>
                    </Box>
                    {
                     menuList.map(LinkName => <li key={LinkName} className="ml-0"><Link to={"/"+LinkName} className="menu-btn">{LinkName}</Link></li>)
                    }
                </ul>
                <Box className="menu-btn py-2 float-right">
                    <i className="fas fa-bars"></i>
                </Box>
            </Box>
        </Box>
    );
};

export default Header;