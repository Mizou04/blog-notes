import React from 'react';
import "./style.scss"
import {ThumbUpTwoTone, Comment, ThumbUpRounded, AddCommentRounded} from "@material-ui/icons"
import logo from "../../assets/logo.jpg"
import thumbnail from "../../assets/pexels.jpg"
import { Button } from '@material-ui/core';

function ArticleDescription(props) {
    return (
        <article className="post">
            <header className="post--header">
                <div className="post--meta">
                    <a href="#" className="post--meta-title">Lorem, ipsum dolor.</a>
                    <p className="post--meta-subtitle">amet consectetur adipisicing elit. Corporis, assumenda.</p>
                </div>
                <div className="post--author">
                    <p className="post--author-time">November 10. 2021</p>
                    <a href="#" className="post--author-infos">
                        <h4 className="post--author-name">John Doe</h4>
                        <img src={logo} alt="the author" className="post--author-img" />
                    </a>
                </div>
            </header>
            <div className="post--description">
                <div style={{backgroundImage : `url(${thumbnail})`, backgroundPosition : "0% 50%", backgroundSize:"cover"}} className="post--description-thumbnail"></div>
                <p className="post--description-summary">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum velit ducimus ad doloribus? Minus consequuntur tempora icing elit. Cum velit ducimus ad doloribus? Minus consequuntur tempo dolorem sequi nobis officia consectetur voluptas enim, distinctio, doloremque maxime eum similique assumenda?</p>
            </div>
            <div className="post--footer">
                <button className="post--footer-cta">CONTINUE READING</button>
                <ul className="post--footer-actions">
                    <li className="post--footer-actions-like"><a href="#"><ThumbUpRounded/></a></li>
                    <li className="post--footer-actions-comment"><a href="#"><AddCommentRounded/></a></li>
                </ul>
            </div>
        </article>
    );
}

export default ArticleDescription;