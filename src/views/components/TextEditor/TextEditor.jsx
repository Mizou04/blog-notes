import "./style.scss"
import {createRef, useContext, useEffect, useState, Component} from "react"
import {Card, Paper, Input, FormControl, FormLabel, Button, Box} from "@material-ui/core";
import {AddAPhoto, Clear, FormatBold, FormatItalic, FormatUnderlined, LinkRounded} from "@material-ui/icons";
import {LoginContext} from "../../../controllers/login.controller"
// import 'quill/dist/quill.core.css';
// import 'quill/dist/quill.snow.css';

import Quill from 'quill/core';
import Toolbar from 'quill/modules/toolbar';
import Snow from 'quill/themes/snow'; //snow works, but need to import and register formats, and replace icons...
import BubbleTheme from 'quill/themes/bubble'; //snow works, but need to import and register formats, and replace icons...

import Bold from 'quill/formats/bold';
import Italic from 'quill/formats/italic';
import Header from 'quill/formats/header';
import Underline from 'quill/formats/underline';
import Link from 'quill/formats/link';
import List, { ListItem } from 'quill/formats/list';

import Icons from 'quill/ui/icons'; 


const author = {name : "", id : ""}; //name : userSession.name ... id : userSession.id or ownerID

const blogPostMeta = {
                title : "", 
                thumbnail : "",
                text : "", 
                date : "",
                author
            }   

function TextEditor({setTextEditorState}){
    const {userSession, ownerID} = useContext(LoginContext);
    const [textData, setTextData] = useState(blogPostMeta);
    const editorRef = createRef();
    
    
    useEffect(()=>{
        Quill.register({
            'modules/toolbar': Toolbar,
            'themes/snow': Snow,
            'formats/bold': Bold,
            'formats/italic': Italic,
            'formats/header': Header,
            'formats/underline': Underline,
            'formats/link': Link,
            'formats/list': List,
            'formats/list/item': ListItem,
            'ui/icons': Icons
          });
      
          
          const icons = Quill.import('ui/icons');
          icons['bold'] = "B";
          icons['italic'] = "I";
          icons['underline'] = "U";
          icons['link'] = "</>";
          icons['clean'] = "Clear"; 
          
          var quill = new Quill('#editor', {
            theme: 'snow', //this needs to come after the above, which registers Snow...
            placeholder: "Write something awesome...",
          });
      
    });
    
            return (<div className="textEditor-container">
                <Card className="textEditor">
                    <header className="textEditor_header">
                        <FormControl className="textEditor_header--title-form">
                            <FormLabel htmlFor="textEditor_header--title-input" focused="true">
                                <input maxLength={55} id="textEditor_header--title-input" className="textEditor_header--title-input" placeholder="your article title (55 characters)"/>
                            </FormLabel>
                        </FormControl>
                        <FormControl className="textEditor_header--picture-form">
                            <FormLabel htmlFor="textEditor_header--picture-input">
                                <input id="textEditor_header--picture-input" type="file" accept="" className="textEditor_header--picture-input" placeholder="thumbnail image (max 2mb)"/>
                                <Button color="primary"><AddAPhoto/></Button>
                            </FormLabel>
                        </FormControl>
                    </header>
                    <div className="textEditor_body">
                        {/* <div id="toolbar"></div> */}
                        <div id='editor' className="textEditor_body-input"></div>
                    </div>
                    <Button onClick={()=>setTextEditorState(false)}>Cancel</Button>
                    <Button>sumbit</Button>
                </Card>
            </div>
            )
    
}

export default TextEditor;