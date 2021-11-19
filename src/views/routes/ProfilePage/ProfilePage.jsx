import React from 'react';
import "./style.scss";
import profileImg from "../../assets/blue circle.svg"
import articleImg from "../../assets/note book 3d.png"
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import { Button, Typography } from '@material-ui/core';
import {Add} from "@material-ui/icons"

function ProfilePage(props) {

    let favorites = Array(5).fill({img : articleImg, title : "topic", description : "genre"});

    return (
        <body className="profile profile--body">
            <section className="profile_banner">
                <Button startIcon={<Add/>} >change banner photo</Button>
            </section>
            <section className="profile_user">
                <div className="profile_user--infos">
                    <img src={profileImg} className="profile_user--infos-picture"/>
                    <h3 className="profile_user--infos-name">JOHN DOE</h3>
                    <p className="profile_user--infos-titulo">programmer</p>
                    <div className="badges"></div>
                </div>
                <div className="profile_user--favorites-container">
                    <div className="profile_user--favorites">
                        {favorites.map(({img, title, description})=>{
                            return <div className="profile_user--favorite">
                                <img className="profile_user--favorite-thumb" src={img} alt="" />
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



export default ProfilePage;