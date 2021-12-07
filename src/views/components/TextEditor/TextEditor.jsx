import "./style.scss"
import {createRef, useContext, useEffect, useCallback, useState, useMemo} from "react"
import {Card, Paper, Input, FormControl, FormLabel, Button, Box} from "@material-ui/core";
import {AddAPhoto, Clear, FormatBold, FormatItalic, FormatUnderlined, LinkRounded} from "@material-ui/icons";
import {LoginContext} from "../../../controllers/login.controller"
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";

import { createEditor, Editor, Transforms, Text } from 'slate';
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
import {CodeElement, DefaultElement, Leaf} from "./elements.js"
import {CustomEditor} from "./helpers"


const useStyles = makeStyles({
    button : {
        color : "white",
        background : "royalblue",
        "&:hover" : {
            color : "white",
            background : "lightblue"
        }
    }
})

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
    // const [textData, setTextData] = useState(blogPostMeta);
    const [value, setValue] = useState([
        {
          type: 'paragraph',
          children: [{ text: 'A line of text in a paragraph.' }],
        },
      ])
    const editorRef = createRef();
    const classes = useStyles();
    
    const editor = useMemo(() => withReact(createEditor()), []);
    
    const renderElement = useCallback(props => {
        switch (props.element.type) {
            case 'code':
            return <CodeElement {...props} />
            default:
            return <DefaultElement {...props} />
        }
    }, []);
    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
      }, [])

    
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
                                <input id="textEditor_header--picture-input" type="file" accept=".jpg, .png, .svg" className="textEditor_header--picture-input" placeholder="thumbnail image (max 2mb)"/>
                                <Button color="primary"><AddAPhoto/></Button>
                            </FormLabel>
                        </FormControl>
                    </header>
                    <div id='editor' className="textEditor_body" style={{border : "1px red solid"}}>
                    <Slate
                        editor={editor}
                        value={value}
                        onChange={newValue => setValue(newValue)}
                    >
                        <Editable className="textEditor_body-input"
                            renderElement={renderElement}
                            renderLeaf={renderLeaf}
                            onKeyDown={event => {
                                if (!event.ctrlKey) {
                                    return
                                  }
                    
                                switch (event.key) {
                                // When "`" is pressed, keep our existing code block logic.
                                case '<': {
                                    event.preventDefault()
                                    CustomEditor.toggleCodeBlock(editor)
                                    break;
                                }
                    
                                // When "B" is pressed, bold the text in the selection.
                                case 'b': {
                                    event.preventDefault()
                                    CustomEditor.toggleBoldMark(editor)
                                    break;
                                }
                                
                                case 'e': 
                                    event.preventDefault();
                                    CustomEditor.toggleItalicMark(editor)
                            }
                        }}
                        />
                    </Slate>
                    </div>
                    <Button variant="outlined" color="secondary" onClick={()=>setTextEditorState(false)}>Cancel</Button>
                    <Button variant="contained" className={classes.button}>sumbit</Button>
                </Card>
            </div>
            )
    
}

export default TextEditor;