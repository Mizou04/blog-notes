import React, { createContext, useCallback, useContext } from 'react';
import {articlesDBref} from "../model/db.model"
import { UserContext } from './user.controller';
import {LoginContext} from "./login.controller"

const ArticlesContext = createContext();

const author = {name : "", id : ""}; //name : userSession.name ... id : userSession.id or ownerID

const blogPostMeta = {
                title : "", 
                thumbnail : "",
                text : "", 
                date : "",
                author,
                id : 0
            }  

function ArticlesController(props) {
    const {getUsersPath, getUser, setUser, updateUser} = useContext(UserContext);
    const {loginHandler, signOutHandler, userSession, ownerID} = useContext(LoginContext)
    const {getDoc, setDoc, updateDoc, collectionPath, removeDoc} = articlesDBref;
    
    
    const getArticlesPath = useMemo(()=>{
        return collectionPath;
    })
    /**
     * @param {articleData : {articles : object[]}}
     */
    const setArticle = useCallback(async (path, articleData) =>{ 
        let userArticles = await getUser(getUsersPath + userSession.id).data().articles;
        await updateUser(getUsersPath + userSession.id, {articles : [...userArticles, articleData]})
        await setDoc(path, articleData)
    });
    
    const getArticle = useCallback(async (path)=>{
        return await getDoc(path);
    })

    const updateArticle = useCallback(async (path, data)=>{
        try{
            await updateDoc(path, data);
        } catch(e){
            throw Error("something gone wrong!")
        }

        let updatedArticle = await getArticle(path);
        let userArticles = await getUser(getUsersPath + userSession.id).data().articles;
        userArticles = userArticles.map(article=>{
            if(article.id === updateArticle.id){
                article = updatedArticle;
            };
            return article;
        })
        await updateUser(getUsersPath + userSession.id, {articles : [...userArticles]})
    })



    return (
        <ArticlesContext.Provider value={{setArticle ,updateArticle ,getArticle ,getArticlesPath}}>
            {props.children}
        </ArticlesContext.Provider>
    );
}

export default ArticlesController;