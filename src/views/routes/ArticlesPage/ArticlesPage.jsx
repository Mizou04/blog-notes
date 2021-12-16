import React, { useState } from 'react';
import ArticleDescription from '../../components/ArticleDescription/ArticleDescription';
import TextEditor from "../../components/TextEditor/TextEditor";

import "./style.scss";
import { Button, Hidden, Typography } from "@material-ui/core"
import {Add} from "@material-ui/icons";
import {Link as RouterLink} from "react-router-dom"

function ArticlesPage(props) {
    let articles = new Array(3).fill(0, 0, 3);



    return (
        <div  className='articles'>
            <header className='articles--options'>
                <ul className="articles--options-actions">
                    <li className="articles--options-action-filter">Filter by:</li>
                </ul>
                <div className="articles--options-addArticle">
                    <Button component={RouterLink} startIcon={<Add/>} color="primary" variant="contained"
                         to={{pathname: "/compose", state:{}}}>
                        New Article
                    </Button>
                </div>
            </header>

            <div className="articles--list">
                {articles.map(v=> <ArticleDescription/>)}
            </div>
        </div>
    );
}

export default ArticlesPage;