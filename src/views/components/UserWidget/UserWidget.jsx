import { Card, CardMedia, CardContent, Accordion, Button, MenuItem, Box, Paper } from '@material-ui/core';
import {ArrowDownward, ArrowDropDown, ArrowDropUp} from "@material-ui/icons"
import React, {createRef, forwardRef, useContext, useEffect, useState} from 'react';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import {LoginContext} from "../../../controllers/login.controller"
import './style.scss'

const UserWidget= () => {
    const {signOutHandler, userSession, ownerID} = useContext(LoginContext);
    let {name, profilePic} = userSession;
    let [dropDownMenuVisibility, setDropDownMenuVisiblity] = useState(true);
    
    useEffect(()=>{
        console.log(userSession)
    }, [userSession])

    return (
        <div className="header-desktop_widget">
            <Button onClick={()=>{setDropDownMenuVisiblity(state=> state === true ? false : true)}} style={{display : "flex", "justify-content" : "space-around", "align-items" : "center", width : "95%"}} className="header-desktop_widget--btn" endIcon={dropDownMenuVisibility == true ? <ArrowDropDown/> : <ArrowDropUp/>}><img width="40" style={{borderRadius : "50%"}} height="40" src={profilePic} />{name}</Button>
            <Box component={Paper} className="header-desktop_widget--dropMenu" hidden={dropDownMenuVisibility}>
                <RouterLink onClick={()=>{setDropDownMenuVisiblity(true)}} className="header-desktop_widget--dropMenu-item" to={{pathname : `/profile/${ownerID}`}}><MenuItem style={{"text-align" : "center"}}>Profile</MenuItem></RouterLink>    
                <MenuItem onClick={()=>{setDropDownMenuVisiblity(true)}} className="header-desktop_widget--dropMenu-item" style={{"text-align" : "center"}} onClick={signOutHandler}>Logout</MenuItem>
            </Box>
        </div>
    );
}

export default UserWidget;