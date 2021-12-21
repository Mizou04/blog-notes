import React, {useRef, useEffect} from 'react';
import "./style.scss"
import {ThumbUpTwoTone, Comment, ThumbUpRounded, AddCommentRounded} from "@material-ui/icons"
import logo from "../../assets/logo.jpg"
// import thumbnail from "../../assets/pexels.jpg"
import { Button } from '@material-ui/core';
import {Link as RouterLink} from "react-router-dom"

function ArticleDescription({data}) {
    let {title, thumbnail, summary, date, author, id} = data;
    let summaryRef = useRef()


    useEffect(()=>{
        summaryRef.current.innerHTML = summary
    }, [])

    return (
        <div className="post">
            <header className="post--header">
                <div className="post--meta">
                    <RouterLink to={{pathname : `/blogpost/${id}`}} className="post--meta-title">{title}</RouterLink>
                    <p className="post--meta-subtitle">amet consectetur adipisicing elit. Corporis, assumenda.</p>
                </div>
                <div className="post--author">
                    <p className="post--author-time">{new Date(date).toDateString()}</p>
                    <a href="#" className="post--author-infos">
                        <h4 className="post--author-name">{author.name}</h4>
                        <img src={author.logo} alt="the author" className="post--author-img" />
                    </a>
                </div>
            </header>
            <div className="post--description">
                <a href={`/blogpost/${id}`} style={{background : `url("${thumbnail}") no-repeat`, backgroundPosition : "center", backgroundSize : "contain"}} className="post--description-thumbnail"></a>
                <p ref={summaryRef} className="post--description-summary">
                </p>
                    {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum velit ducimus ad doloribus? Minus consequuntur tempora icing elit. Cum velit ducimus ad doloribus? Minus consequuntur tempo dolorem sequi nobis officia consectetur voluptas enim, distinctio, doloremque maxime eum similique assumenda?</p> */}
            </div>
            <div className="post--footer">
                <a href={`/blogpost/${id}`} className="post--footer-cta">CONTINUE READING</a>
                <ul className="post--footer-actions">
                    <li className="post--footer-actions-like"><a href="#"><ThumbUpRounded/></a></li>
                    <li className="post--footer-actions-comment"><a href="#"><AddCommentRounded/></a></li>
                </ul>
            </div>
        </div>
    );
}

export default ArticleDescription;