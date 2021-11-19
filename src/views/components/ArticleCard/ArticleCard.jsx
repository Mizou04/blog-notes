import React from 'react';
import "./style.scss"
import img from "../../assets/man.png"

function ArticleCard(props) {
    return (
        <div className="article_card">
            <img className="article_card--thumb" src={img}/>
            <div className="article_card--description">
                <h3 className="article_card--description-title">article title</h3>
                <p className="article_card--description-subtitle">article subtitle</p>
            </div>
            <div className="article_card--options"></div>
        </div>
    );
}

export default ArticleCard;