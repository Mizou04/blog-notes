import React, { useEffect } from 'react';
import "./style.scss"
// import { Link as RouterLink} from "react-router-dom"
import {Box, Button, Card ,Paper, Typography} from "@material-ui/core"
import {PostAddTwoTone, ArtTrackSharp, Policy} from "@material-ui/icons"
import noteBook from "../../assets/note book 3d.png"

function MainPage(props) {


    return (
        <main className="main main--body">
            <section className="main--section main--section-presentation"> 
                <div className="section--text">
                    <h1 className="section--text_title" >Share what you got</h1>
                    <p className="section--text_subtitle">
                        stay lightweight with little, leightweight toughts
                    </p>
                    <p className="section--text_description">
                        share, comment, socialise
                    </p>
                </div>
                <div className="section--product">
                    <img src={noteBook}className="section--product_img"/>
                </div>   
            </section>
            <section className="main--section main--section-offers">
                <h3 className="main--section-offers_title">What do we have for you?</h3>
                <div className="offers">
                    <p className="offers--description">
                        whatever your style is, we got you!
                    </p>
                    <div className="offers--tags">
                        <Box className="offers--tags_tag">
                            <PostAddTwoTone className="offers--tags_tag-icon"/>
                            <h3 className="offers--tags_tag-title">blog posts</h3>
                            <p className="offers--tags_tag-text">Lorem ipsum dolor sit amet.</p>
                            <a href="" className="offers--tags_tag-link">more!</a>
                        </Box>
                        <Box className="offers--tags_tag">
                            <ArtTrackSharp className="offers--tags_tag-icon"/>
                            <h3 className="offers--tags_tag-title">Art</h3>
                            <p className="offers--tags_tag-text">Lorem ipsum dolor sit amet.</p>
                            <a href="" className="offers--tags_tag-link">more!</a>
                        </Box>
                        <Box className="offers--tags_tag">
                            <Policy className="offers--tags_tag-icon"/>
                            <h3 className="offers--tags_tag-title">Licensing</h3>
                            <p className="offers--tags_tag-text">Lorem ipsum dolor sit amet.</p>
                            <a href="" className="offers--tags_tag-link">more!</a>
                        </Box>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default MainPage;