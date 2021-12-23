import "./style.scss"
import {memo, useRef, useContext, useEffect, useCallback, useState, useMemo} from "react"
import {Card, Paper, Input, FormControl, FormLabel, Button, Box} from "@material-ui/core";
import {AddAPhoto, Clear, FormatBold, FormatItalic, FormatUnderlined, LinkRounded} from "@material-ui/icons";
import {LoginContext} from "../../../controllers/login.controller"
import { blue, red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";
import {Link as RouterLink, useRouteMatch, useHistory, useParams} from "react-router-dom";
import TextEditor from "../../components/TextEditor/TextEditor"
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import {ArticlesContext} from "../../../controllers/articles.controller"


const useStyles = makeStyles({
    button : {
        padding : "5px 10px",
    },
    previewBtn : {
        color : "white",
        background : "royalblue",
        marginLeft : "10px",
        "&:hover" : {
            color : "white",
            background : blue[500]
        }
    }
})

const author = {name : "", id : ""}; //name : userSession.name ... id : userSession.id or ownerID

const blogPostMeta = {
                title : "", 
                thumbnail : "",
                content : "", 
                date : "",
                author
            }   


function ComposePage({}){
    let {setArticle, addArticle ,updateArticle ,getArticle ,getArticlesPath} = useContext(ArticlesContext);
    const {userSession, ownerID} = useContext(LoginContext);
    const {path} = useRouteMatch();
    const {pathname} = useHistory().location;
    const {articleID} = useParams();

    const [data, setData] = useState({title : JSON.parse(window.sessionStorage.getItem("TITLE")) || null,
                                     imgSrc : JSON.parse(window.sessionStorage.getItem("THUMBNAIL")) || null, 
                                     content : JSON.parse(window.sessionStorage.getItem("CONTENT")) || {blocks : []}})
    const classes = useStyles();
    const imgSrc = useMemo(()=> data.imgSrc, [data.imgSrc]);


    useEffect(()=> {
        switch (path) {
            case "modify/" + articleID :
                getArticle(getArticlesPath + articleID).then(returnedData=>{
                    setData(prev => prev.title = returnedData.title);
                    setData(prev => prev.imgSrc = returnedData.thumbnail);
                    setData(prev => prev.content = returnedData.content);
                })
                break;
        }
    }, [])

    useEffect(()=>{
        window.sessionStorage.setItem("TITLE", JSON.stringify(data.title));
    }, [data.title])

    useEffect(()=>{
        console.log(data.content);
        window.sessionStorage.setItem("CONTENT", JSON.stringify(data.content));
    }, [data.content])
    
    const titleChangeHandler = (e) =>{
        setData(prevdata => {return {...prevdata, title : e.target.value}});
    }
    
    const clearSessionStorageHandler = function (){
        window.sessionStorage.removeItem("CONTENT")
        window.sessionStorage.removeItem("TITLE")
        window.sessionStorage.removeItem("THUMBNAIL")
    }

    const renderAdequateButton = () =>{
        switch(path){
            case "/create": 
                return <Button to={{pathname:"/create/preview", state : {data}}} variant="contained" className={`${classes.button} ${classes.previewBtn}`} component={RouterLink}>preview</Button>;
            case "/modify" + articleID :
                return <Button to={{pathname:`/modify/${articleID}/preview`, state : {data}}} variant="contained" className={`${classes.button} ${classes.previewBtn}`} component={RouterLink}>preview</Button>
        }
    }

    return (
        <div className="textEditor-container">
            <div className="textEditor">
                <header className="textEditor_header">
                    <FormControl className="textEditor_header--title-form">
                        <FormLabel htmlFor="textEditor_header--title-input" focused="true">
                            <input maxLength={35} value={data.title} onChange={titleChangeHandler} id="textEditor_header--title-input" className="textEditor_header--title-input" placeholder="your article title (35 characters)"/>
                        </FormLabel>
                    </FormControl>
                    <ImageUploader imgSrc={imgSrc} setData={setData}/>
                    <div className="textEditor_header--picture-form">
                        <Button className={classes.button} component={RouterLink} to="/articles" onClick={clearSessionStorageHandler} variant="contained" color="secondary">Cancel</Button>
                        {renderAdequateButton()}
                    </div>
                </header>
                <div  className="textEditor_body--container">
                    <TextEditor content={data.content} setData={setData}/>
                </div>
                
            </div>
        </div>
    )
    
}

export default memo(ComposePage);