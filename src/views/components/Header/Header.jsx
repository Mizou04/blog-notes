import React, {useContext, useEffect, useState, createRef} from 'react';
import "./style.scss"
import {Button, Typography} from "@material-ui/core"
import {Link as RouterLink, NavLink} from "react-router-dom";
import {LoginContext} from "../../../controllers/login.controller"
import UserWidget from '../UserWidget/UserWidget';


function Header(props) {
    const {signOutHandler, userSession} = useContext(LoginContext);

    return (
        <header  className="header header-desktop">
            <h1 className="header--logo">Blog.</h1>
            <ul className="header--navbar">
                <li><NavLink activeStyle={{color : "crimson"}} exact to="/" className="header--link">Home</NavLink></li>
                <li><NavLink activeStyle={{color : "crimson"}} to="/about" className="header--link">About</NavLink></li>
                <li><NavLink activeStyle={{color : "crimson"}} to="/articles" className="header--link">Articles</NavLink></li>
            </ul>
            {
                Object.keys(userSession).length !== 0 ? <UserWidget/> :
                // Object.keys(userSession).length !== 0 ? <a onClick={signOutHandler}>logout</a> :
                <RouterLink to='./start'><button className="header--button-login">start now!</button></RouterLink>
            }            
        </header>
    );
} 

export default Header;