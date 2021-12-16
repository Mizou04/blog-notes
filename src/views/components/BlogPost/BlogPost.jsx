import { Typography, Button, makeStyles } from '@material-ui/core';
import React, { createRef, useEffect, useRef, useState } from 'react';
import blogThumb from "../../assets/yellow circle.svg";
import ArticleCard from '../ArticleCard/ArticleCard';
import "./style.scss"
import {useHistory} from "react-router-dom";
import edjsHTML from "editorjs-html"
// import Modal from "../Modal/Modal"

function BlogPost(props) {
    const articleRef = useRef();
    const thumbnailRef = useRef();
    const history = useHistory()
    const {state} = history.location;
    const edjsParser = edjsHTML();
    let blocks = state.data.content.blocks;
    let parsedBlock = edjsParser.parse({blocks});

    const useStyles = makeStyles(()=>({
    body : {
        background : `hsl(342, 100%, 56%)`,
        width : 400,
        height : 160,
        border : "1px black solid",
        position : "absolute"
    },
    button : {
        borderRadius : "0px",
        margin :"0px 15px",
    },
    cancelBtn : {
        background : "linear-gradient(to bottom, hsl(362, 83%, 46%), hsl(362, 83%, 40%))",
        color : "white",
        padding : "5px 10px",
        '&:hover' : {
            background : "linear-gradient(to bottom, hsl(362, 83%, 40%), hsl(362, 83%, 35%))"
        }
    },
    sumbitBtn : {
        background : "linear-gradient(to bottom, hsl(132, 83%, 42%), hsl(137, 80%, 44%))",
        color : "white",
        padding : "5px 30px",
        '&:hover' : {
            background : "linear-gradient(to bottom, hsl(132, 83%, 37%), hsl(137, 80%, 40%))",
        }
    } 
}))
    
    useEffect(()=>{
        parsedBlock?.forEach(element=>{
            articleRef.current.innerHTML += element;
        });
    }, [])
    useEffect(()=>{
        console.log(thumbnailRef.current)
    }, [thumbnailRef.current])

    return (
        <div  className="blog">
        <div className="blog_post">
            <h1 className="blog_post--header">{state.data.title || "Lorem, ipsum dolor."}</h1>
            <div className="blog_post--meta">
                <h4 className="blog_post--meta-author">John Doe</h4>
                <h4 className="blog_post--meta-date">25/11/2021</h4>
            </div>
            <div className="blog_post--thumb">
                <img ref={thumbnailRef} src={state.data.imgSrc} alt="thumbnail image" className="blog_post--thumb-picture" />
                <span className="blog_post--thumb-description">pic by me</span>
            </div>

            <article ref={articleRef} color="black" className="blog_post--article"/>

        </div>
        <aside className="blog_post--aside">
            <div className="blog_post--aside-content">
                <span>are you ready to post?</span>
                <div  className={`blog_post--aside-buttons`}>
                <Button onClick={()=> history.replace("/compose")} className={useStyles().cancelBtn}>not yet</Button> 
                <Button className={useStyles().sumbitBtn} variant="contained" color="primary">sumbit</Button>
                {/*return to texteditor*/}
                </div>
            </div>
        </aside>

        {/* <div className="blog_more">
            <h3 className="blog_more_header">Related : </h3>
            <div className="blog_more_links">
            <ArticleCard/><ArticleCard/>
            <ArticleCard/><ArticleCard/>
            <ArticleCard/><ArticleCard/>
            <ArticleCard/><ArticleCard/>
            </div>
        </div> */}
        </div>
    );
}

export default BlogPost;