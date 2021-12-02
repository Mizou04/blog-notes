import React, { useEffect, useContext, useState, memo } from 'react';
import "./style.scss";
import profileImg from "../../assets/blue circle.svg"
import articleImg from "../../assets/note book 3d.png"
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import { Button, Typography } from '@material-ui/core';
import {Add, Settings} from "@material-ui/icons"
import { useHistory, useParams } from 'react-router';
import { LoginContext } from '../../../controllers/login.controller';
import { UserContext } from '../../../controllers/user.controller';

function ProfilePage(props) {
    const {getUser, updateUser, getUsersPath} = useContext(UserContext);
    const {ownerID} = useContext(LoginContext);
    const {userID} = useParams();
    const [user, setUser] = useState({});
    const {name, joined, description, lastOnline, profilePic, articles} = user;

    const isOwner = ownerID === userID;

    let favorites = Array(5).fill({img : articleImg, title : "topic", description : "genre"});

    // function getDate(string) {
    //     let [_, month, day, year] =
    //     /(\d{1,2})\/(\d{1,2})\/(\d{4})/.exec(string);
    //     return `joined : ${day}/${month}/${year}`;
    // }

    useEffect(()=>{
        async function fetchUser(userID){
            let userDoc = await getUser(getUsersPath + userID);
            setUser(userDoc.data());
        };
        fetchUser(userID)
    }, [userID])

    return (
        <body className="profile profile--body">
            <section className="profile_banner">
                {isOwner && <Button startIcon={<Add/>} >change banner photo</Button>}
            </section>
            <section className="profile_user">
                {isOwner && <Button className="profile_user--modify-btn" variant="text"><Settings/></Button>}
                <div className="profile_user--infos">
                    <img src={profilePic} className="profile_user--infos-picture"/>
                    <h3 className="profile_user--infos-name">{name}</h3>
                    <p className="profile_user--infos-titulo">{description || "programmer"}</p>
                    {/* <p className="profile_user--infos-joined">{getDate(user?.joined)}</p> */}
            
                    <div className="badges"></div>
                </div>
                <div className="profile_user--favorites-container">
                    <div className="profile_user--favorites">
                        {favorites.map(({img, title, description})=>{
                            return <div className="profile_user--favorite">
                                <img className="profile_user--favorite-thumb" src={img} alt="user profile picture" />
                                <div className="profile_user--favorite-description">
                                    <h6>{title}</h6>
                                    <p>{description}</p>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </section>
            <section className="profile_data">
                <div style={{display : "flex", justifyContent : "end" ,width : "100%", marginTop : "5px"}}>
                    <Button startIcon={<Add/>} variant="contained" style={{color : "white", background : "royalblue"}}>
                        <p style={{fontFamily : "poppins", textTransform : "lowercase"}}>Add selection</p>
                    </Button>
                </div>
                <h4>Trip</h4>
                <div className="articles--container">
                    <ArticleCard/>
                    <ArticleCard/>
                    <ArticleCard/>
                    <ArticleCard/>
                    <ArticleCard/>
                </div>
                <h4>Gamelogy</h4>
                <div className="articles--container">
                    <ArticleCard/>
                </div>
            </section>
        </body>
    );
}



export default memo(ProfilePage);