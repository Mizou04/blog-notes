import React, { createRef, useEffect, useRef, useState , useContext} from 'react';
import "./style.scss"
import {useHistory, useParams, Link as RouterLink} from "react-router-dom";

import { Typography, Button, makeStyles } from '@material-ui/core';

import ArticleCard from '../ArticleCard/ArticleCard';
import edjsHTML from "editorjs-html"

import {LoginContext} from "../../../controllers/login.controller"
import {ArticlesContext} from "../../../controllers/articles.controller"
import Loader from "../Loader/Loader";
import Alert from "../Alert/Alert"


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


function BlogPost(props) {
    let {userSession} = useContext(LoginContext);
    let {setArticle, addArticle ,updateArticle ,getArticle ,getArticlesPath} = useContext(ArticlesContext);
    let [isLoading, setIsloading] = useState(false);
    let [isAlert, setIsAlert] = useState(false);

    const history = useHistory()
    const {state} = history.location;
    const {articleID} = useParams();

    useEffect(()=>{
        console.log(history.location.pathname)
    });
    
    const edjsParser = edjsHTML();
    let blogpost = state?.data.content;

    let blocks = blogpost?.blocks;

    let parsedBlock = edjsParser.parse({blocks});

    const articleRef = useRef();
    const thumbnailRef = useRef();

    const classes = useStyles();

    const postData = {
                title : state.data.title,
                thumbnail : state.data.imgSrc,
                content : state.data.content,
                summary : undefined,
                date : state.data.content.time,
                author : {
                    name : userSession.name, id : userSession.id, logo : userSession.profilePic 
                },
                id : userSession.id + state.data.content.time
            }

    
    const sumbitHandler = () =>{
        /**
         * - click : show a loader and publish the article(data) to firestore
         * - show prompt that notify the end of the process
         * - after closing the prompt we should be directed to articlesPage (route)
         * getArticlesPath + userSession.id + blogpost.content.time,
         */
        setIsloading(true);
        setArticle(getArticlesPath + userSession.id + blogpost.content.time, postData).then(()=>{
            setIsloading(false);
        }).then(()=>{
            setIsAlert(true);
        })
        // .catch((e)=>{
        //     setIsAlert(false);
        //     throw Error(e);
        //     window.alert("something is not allowed")
        // });
    }
    const promptHandler = () =>{
        setIsAlert(false);
        history.replace("/articles");
    }
    
    useEffect(()=>{
        // articleID && (blogpost = (async ()=>{
        //     await getArticle(getArticlesPath + articleID)
        // })())
        articleID && getArticle(getArticlesPath + articleID).then(data=>{
            blogpost = data.content;
        })
    }, [articleID])

    useEffect(()=>{
        parsedBlock?.forEach(element=>{
            articleRef.current.innerHTML += element;
        });
        postData.summary = articleRef.current.innerHTML.substring(0, 55)
    }, [])

    useEffect(()=>{
        console.log(thumbnailRef.current)
    }, [thumbnailRef.current])



    return (
        <div  className="blog">
            {isLoading && <Loader/>}
            {isAlert && <Alert text="your article is posted" handler={promptHandler} />}
        <div className="blog_post">
            <h1 className="blog_post--header">{blogpost.title || "Lorem, ipsum dolor."}</h1>
            <div className="blog_post--meta">
                <h4 className="blog_post--meta-author">{userSession.name}</h4>
                <h4 className="blog_post--meta-date">{new Date(blogpost.content.time).toDateString()}</h4>
            </div>
            <div className="blog_post--thumb">
                <img ref={thumbnailRef} src={blogpost.imgSrc} alt="thumbnail image" className="blog_post--thumb-picture" />
                {/* <span className="blog_post--thumb-description">pic by me</span> */}
            </div>

            <article ref={articleRef} color="black" className="blog_post--article"/>

        </div>
        {!articleID &&
        <aside className="blog_post--aside">
            <div className="blog_post--aside-content">
                <span>are you ready to post?</span>
                <div  className={`blog_post--aside-buttons`}>
                <Button onClick={()=> history.goBack()} className={classes.cancelBtn}>not yet</Button> 
                <Button onClick={sumbitHandler} className={classes.sumbitBtn} variant="contained" color="primary">sumbit</Button>
                {/*return to texteditor*/}
                </div>
            </div>
        </aside>}

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