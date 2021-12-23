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
    let [mode, setMode] = useState("read")
    
    const history = useHistory()
    const {state, pathname} = history.location;
    const {articleID} = useParams();

    let [blogpost, setBlogpost] = useState({title : JSON.parse(window.sessionStorage.getItem("TITLE")) || null,
                                     imgSrc : JSON.parse(window.sessionStorage.getItem("THUMBNAIL")) || null, 
                                     content : JSON.parse(window.sessionStorage.getItem("CONTENT")) || {blocks : []}});

    useEffect(()=>{
        console.log(history.location.pathname)
    });
    
    const edjsParser = edjsHTML();



    const articleRef = useRef();
    const thumbnailRef = useRef();

    const classes = useStyles();

    const postData = {
                title : state?.data.title,
                thumbnail : state?.data.imgSrc,
                content : state?.data.content,
                date : state?.data.content.time,
                author : {
                    name : userSession.name, id : userSession.id, logo : userSession.profilePic 
                },
                id : userSession.id + state?.data.content.time
            }

    const clearSessionStorageHandler = () => {
        window.sessionStorage.removeItem("CONTENT")
        window.sessionStorage.removeItem("TITLE")
        window.sessionStorage.removeItem("THUMBNAIL")
    };

    const sumbitHandler = () =>{
        /**
         * - click : show a loader and publish the article(data) to firestore
         * - show prompt that notify the end of the process
         * - after closing the prompt we should be directed to articlesPage (route)
         * getArticlesPath + userSession.id + blogpost.content.time,
         */
        setIsloading(true);
        if(mode === "create"){
            setArticle(getArticlesPath + userSession.id + blogpost.content.time, postData)
            .then(()=>{
                setIsloading(false);
            })
            .then(()=>{
                setIsAlert(true);
            })
            .catch((e)=>{
                setIsAlert(false);
                throw Error(e);
                window.alert("something is not allowed")
            });
        } else if(mode === "update"){
            updateArticle(getArticlesPath + articleID, postData).then(()=>{
                setIsloading(false);
            }).then(()=>{
                setIsAlert(true);
            })
            .catch((e)=>{
                setIsAlert(false);
                throw Error(e);
                // window.alert("something is not allowed")
            });
        };
        clearSessionStorageHandler();
    }
    
    const promptHandler = () =>{
        setIsAlert(false);
        history.replace("/articles");
    }
    
    // useEffect(()=>{
    //     switch (pathname){
    //         case "/create/preview" : 
    //             setMode("create")
    //             break;
    //         case "/blogpost/" + articleID :
    //             setMode("read");
    //             break;
    //         case "/modify/" + articleID + "/preview" :
    //             setMode("update");
    //             break;
    //     }
    // }, [pathname])

    useEffect(()=>{
        
        switch(pathname){
            case "/blogpost/" + articleID :
                getArticle(getArticlesPath + articleID).then(article=>{
                    setBlogpost(article.data());
                    console.log(article.data())
                });
                setMode("read")
                break;
            case "/create/preview" :
                setBlogpost(state?.data);
                setMode("create")
                break;
            case "/modify/" + articleID + "/preview":
                setBlogpost(state?.data); 
                setMode("update")
                break;
        }
        
        let parsedBlock = edjsParser.parse({blocks : blogpost?.content?.blocks})
        
        parsedBlock?.forEach(element=>{
            articleRef.current.innerHTML += element;
        });

    }, [pathname])


    return (
        <div  className="blog">
            {isLoading && <Loader/>}
            {isAlert && <Alert text="your article is posted" handler={promptHandler} />}
        <div className="blog_post">
            <h1 className="blog_post--header">{blogpost?.title}</h1>
            <div className="blog_post--meta">
                <h4 className="blog_post--meta-author">{userSession.name}</h4>
                <h4 className="blog_post--meta-date">{new Date(blogpost?.content?.time).toDateString()}</h4>
            </div>
            <div className="blog_post--thumb">
                <img ref={thumbnailRef} src={blogpost?.thumbnail || blogpost?.imgSrc} alt="thumbnail image" className="blog_post--thumb-picture" />
                {/* <span className="blog_post--thumb-description">pic by me</span> */}
            </div>

            <article ref={articleRef} color="black" className="blog_post--article"/>

        </div>
        {(mode === "create" || mode === "update" ) &&
        <aside className="blog_post--aside">
            <div className="blog_post--aside-content">
                <span>are you ready to {mode === "create" ? "post" : "proceed"}?</span>
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