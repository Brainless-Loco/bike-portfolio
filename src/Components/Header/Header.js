import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../Images/Logo/logo.svg';

const Header = () => {
    let menuList = ["About","Director","Research","Teaching","Projects","Researchers","Latest"]
    return (
        <div className="header">
            <Link to="/"><img className="logo" src={logo} alt="logo"/></Link>
            <div className="text-md-right">
                <ul className="menu ml-0 mb-5 pr-1">
                    <div className="col-10 mx-auto">
                        <img className="menu-btn mx-auto" width="120px" src={logo} alt="logo"/>
                        <hr className="menu-btn mt-3 mx-auto"/>
                    </div>
                    {
                     menuList.map(LinkName => <li className="ml-0"><Link to={"/"+LinkName} className="menu-btn">{LinkName}</Link></li>)
                    }
                </ul>
                <div className="menu-btn py-2 float-right">
                    <i className="fas fa-bars"></i>
                </div>
            </div>
        </div>
    );
};

export default Header;