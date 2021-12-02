import React from 'react';
import ArticleDescription from '../../components/ArticleDescription/ArticleDescription';
import "./style.scss"

function ArticlesPage(props) {
    let articles = new Array(3).fill(0, 0, 3)


    return (
        <div className='articles'>
            {articles.map(v=> <ArticleDescription/>)}
        </div>
    );
}

export default ArticlesPage;