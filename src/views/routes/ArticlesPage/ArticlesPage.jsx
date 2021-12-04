import React, { useState } from 'react';
import ArticleDescription from '../../components/ArticleDescription/ArticleDescription';
import TextEditor from "../../components/TextEditor/TextEditor";

import "./style.scss";
import { Button, Hidden, Typography } from "@material-ui/core"
import {Add} from "@material-ui/icons"

function ArticlesPage(props) {
    let articles = new Array(3).fill(0, 0, 3)
    let [textEditorState, setTextEditorState] = useState(false);



    return (
        <div style={{overflowY : textEditorState === true ? "hidden" : "scroll"}} className='articles'>
            <header className='articles--options'>
                <ul className="articles--options-actions">
                    <li className="articles--options-action-filter">Filter by:</li>
                </ul>
                <div className="articles--options-addArticle">
                    <Button onClick={()=>setTextEditorState(true)} startIcon={<Add/>} color="primary" variant="contained">
                        <Typography variant="button">New Article</Typography>
                    </Button>
                </div>
            </header>
                {textEditorState ? <TextEditor setTextEditorState={setTextEditorState}/> : null}
            <div style={{overflowY : textEditorState === true ? "hidden" : "scroll"}} className="articles--list">
                {articles.map(v=> <ArticleDescription/>)}
            </div>
        </div>
    );
}

export default ArticlesPage;