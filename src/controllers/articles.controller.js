import React, { createContext, useCallback, useContext, useMemo } from 'react';
import {articlesDBref} from "../model/db.model"
import { UserContext } from './user.controller';
import {LoginContext} from "./login.controller"

export const ArticlesContext = createContext();

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
    const {getUsersPath, getUser, setUser, updateUser, userArrayUnion, userArrayRemove} = useContext(UserContext);
    const {loginHandler, signOutHandler, userSession, ownerID} = useContext(LoginContext)
    const {getDoc, setDoc, updateDoc, collectionPath, removeDoc, getCollectionDocs, addDoc} = articlesDBref;
    
    
    const getArticlesPath = useMemo(()=>{
        return collectionPath;
    })
    /**
     * @param {articleData : {articles : object[]}}
     */
    // const setArticle = useCallback(async (path, articleData) =>{ 
    //     let userArticles = await getUser(getUsersPath + userSession.id).data().articles;
    //     await updateUser(getUsersPath + userSession.id, {articles : [...userArticles, articleData]})
    //     await setDoc(path, articleData)
    // });
    const setArticle = useCallback(async (path, articleData) =>{ 
        // await updateUser(getUsersPath + userSession.id, {articles : userArrayUnion(articleData)})
        return await setDoc(path, articleData)
    });
    
    const addArticle = useCallback(async (data) =>{
        return await addDoc(data)
    })

    const getArticle = useCallback(async (path)=>{
        return await getDoc(path);
    })

    const updateArticle = useCallback(async (path, data)=>{
        try{
            await updateDoc(path, data);
        } catch(e){
            throw Error("something gone wrong!")
        }
        await updateUser(getUsersPath + userSession.id, {articles : userArrayRemove(getArticle(path))})
        await updateUser(getUsersPath + userSession.id, {articles : userArrayUnion(data)})
    })

    const getArticlesCollection = useCallback(async (query) =>{
        return await getCollectionDocs(query);
    })

    return (
        <ArticlesContext.Provider value={{setArticle, addArticle ,updateArticle ,getArticle, getArticlesCollection ,getArticlesPath}}>
            {props.children}
        </ArticlesContext.Provider>
    );
}

export default ArticlesController;