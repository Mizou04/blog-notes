import React, { useContext, useState, memo, useEffect } from 'react';
import ArticleDescription from '../../components/ArticleDescription/ArticleDescription';
import {LoginContext} from "../../../controllers/login.controller"
import {ArticlesContext} from "../../../controllers/articles.controller"

import "./style.scss";
import { Button, Hidden, Typography } from "@material-ui/core"
import {Add} from "@material-ui/icons";
import {Link as RouterLink} from "react-router-dom"

function ArticlesPage(props) {
    // let articles = new Array(3).fill(0, 0, 3);
    let {userSession} = useContext(LoginContext);
    // let ARTICLES = useContext(ArticlesContext);
    let {getArticlesCollection ,updateArticle ,getArticle, getArticlesPath} = useContext(ArticlesContext);
    let [articles, setArticles] = useState([]);

    useEffect(()=>{
        
        getArticlesCollection("articles").then(v => {
            setArticles(prev => [...prev, ...v])
            console.log(v)
        })
    }, [])

    return (
        <div  className='articles'>
            <header className='articles--options'>
                <ul className="articles--options-actions">
                    <li className="articles--options-action-filter">Filter by:</li>
                </ul>
                <div className="articles--options-addArticle">
                    {!!Object.keys(userSession).length && <Button component={RouterLink} startIcon={<Add/>} color="primary" variant="contained"
                         to={{pathname: "/compose", state:{}}}>
                        New Article
                    </Button>}
                </div>
            </header>
            <div className="articles--list">
                {/* {articles.map(value=> <ArticleDescription data={value}/>)} */}
                {articles.map((article)=>{
                    return <ArticleDescription data={article} />
                })}
            </div>
        </div>
    );
}

export default memo(ArticlesPage);