import React from 'react';
import "./style.scss"
import {Button, Typography} from "@material-ui/core"
import {Link as RouterLink, NavLink} from "react-router-dom";

function Header(props) {
    return (
        <header className="header header--desktop">
            <h1 className="header--logo">Blog.</h1>
            <ul className="header--navbar">
                <li><NavLink activeStyle={{color : "crimson"}} exact to="/" className="header--link">Home</NavLink></li>
                <li><NavLink activeStyle={{color : "crimson"}} to="/about" className="header--link">About</NavLink></li>
                <li><NavLink activeStyle={{color : "crimson"}} to="/articles" className="header--link">Articles</NavLink></li>
            </ul>
            <button className="header--button-login" /*='header--button-login'*/>start now</button>
        </header>
    );
}

export default Header;