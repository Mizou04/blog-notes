import "./style.scss"
import {memo, useRef, useContext, useEffect, useCallback, useState, useMemo} from "react"
import {Card, Paper, Input, FormControl, FormLabel, Button, Box} from "@material-ui/core";
import {AddAPhoto, Clear, FormatBold, FormatItalic, FormatUnderlined, LinkRounded} from "@material-ui/icons";
import {LoginContext} from "../../../controllers/login.controller"
import { blue, red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";
import {Link as RouterLink} from "react-router-dom";
import TextEditor from "../../components/TextEditor/TextEditor"
import ImageUploader from "../../components/ImageUploader/ImageUploader";



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
    const {userSession, ownerID} = useContext(LoginContext);
    const [data, setData] = useState({title : JSON.parse(window.sessionStorage.getItem("TITLE")) || null,
                                     imgSrc : JSON.parse(window.sessionStorage.getItem("THUMBNAIL")) || null, 
                                     content : JSON.parse(window.sessionStorage.getItem("CONTENT")) || {blocks : []}})
    const classes = useStyles();
    const imgSrc = useMemo(()=> data.imgSrc, [data.imgSrc]);

    useEffect(()=>{
        window.sessionStorage.setItem("TITLE", JSON.stringify(data.title));
        // return ()=>{
        //     window.sessionStorage.setItem("TITLE", JSON.stringify(null))
        // }
    }, [data.title])

    useEffect(()=>{
        console.log(data.content);
        window.sessionStorage.setItem("CONTENT", JSON.stringify(data.content));
        // return ()=>{
        //     window.sessionStorage.setItem("CONTENT", JSON.stringify({blocks : []}))
        // }
    }, [data.content])
    
    const titleChangeHandler = (e) =>{
        setData(prevdata => {return {...prevdata, title : e.target.value}});
    }
    
    const clearSessionStorageHandler = function (){
        window.sessionStorage.removeItem("CONTENT")
        window.sessionStorage.removeItem("TITLE")
        window.sessionStorage.removeItem("THUMBNAIL")
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
                    <Button to={{pathname:"/preview", state : {data}}} variant="contained" className={`${classes.button} ${classes.previewBtn}`} component={RouterLink}>preview</Button>
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