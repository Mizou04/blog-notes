import { Typography } from '@material-ui/core';
import React from 'react';
import blogThumb from "../../assets/yellow circle.svg";
import ArticleCard from '../ArticleCard/ArticleCard';
import "./style.scss"

function BlogPost(props) {
    return (
        <div className="blog">
        <div className="blog_post">
            <h1 className="blog_post--header">Lorem, ipsum dolor.</h1>
            <div className="blog_post--meta">
                <h4 className="blog_post--meta-author">John Doe</h4>
                <h4 className="blog_post--meta-date">25/11/2021</h4>
            </div>
            <div className="blog_post--thumb">
                <img src={blogThumb} alt="" className="blog_post--thumb-picture" />
                <span className="blog_post--thumb-description">pic by me</span>
            </div>
            <article color="black" className="blog_post--article">
                <p className="blog_post--article_paragraph">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem omnis eveniet laudantium rerum? Numquam ab similique labore modi est? Reiciendis odit assumenda earum aliquid, magni debitis voluptate voluptates temporibus nobis nam dolor doloremque totam molestiae ipsum numquam ab sunt mollitia! Est quis quasi ea tempore similique eligendi hic impedit iusto?</p>
                <p className="blog_post--article_paragraph">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem omnis eveniet laudantium rerum? Numquam ab similique labore modi est? Reiciendis odit assumenda earum aliquid, magni debitis voluptate voluptates tempo uam ab similique labore modi est? Reiciendis odit assumenda earum aliquid, magni debitis voluptate voluptates tempo uam ab similique labore modi est? Reiciendis odit assumenda earum aliquid, magni debitis voluptate voluptates temporibus nobis nam dolor doloremque totam molestiae ipsum numquam ab sunt mollitia! Est quis quasi ea tempore similique eligendi hic impedit iusto?</p>
                <p className="blog_post--article_paragraph">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem omnis eveniet laudantium rerum? Numquam ab similique labore modi est? Reiciendis odit assumenda earum aliquid, magni debitis voluptate voluptates temporibus nobis nam dolor doloremque totam molestiae ipsum numquam ab sunt mollitia! Est quis quasi ea tempore similique eligendi hic impedit iusto?</p>
                <p className="blog_post--article_paragraph">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem omnis eveniet laudantium rerum? Numquam ab similique labore modi est? Reiciendis odit assumenda earum aliquid, magni debitis voluptate voluptates temporibus nobis nam dolor doloremque totam molestiae ipsum numquam ab sunt mollitia! Est quis quasi ea tempore similique eligendi hic impedit iusto?</p>
                <p className="blog_post--article_paragraph">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem omnis eveniet laudantium rerum? Numquam ab similique labore modi est? Reiciendis odit assumenda earum aliquid, magni debitis voluptate voluptates temporibus nobis nam dolor doloremque totam molestiae ipsum numquam ab sunt mollitia! Est quis quasi ea tempore similique eligendi hic impedit iusto?</p>
                <p className="blog_post--article_paragraph">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem omnis eveniet laudantium rerum? Numquam ab similique labore modi est? Reiciendis odit assumenda earum aliquid, magni debitis voluptate voluptates temporibus nobis nam dolor doloremque totam molestiae ipsum numquam ab sunt mollitia! Est quis quasi ea tempore similique eligendi hic impedit iusto?</p>
            </article>
        </div>
        <div className="blog_more">
            <h3 className="blog_more_header">Related : </h3>
            <div className="blog_more_links">
            <ArticleCard/><ArticleCard/>
            <ArticleCard/><ArticleCard/>
            <ArticleCard/><ArticleCard/>
            <ArticleCard/><ArticleCard/>
            </div>
        </div>
        </div>
    );
}

export default BlogPost;