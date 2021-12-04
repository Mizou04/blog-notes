import {Card, Paper, Input, FormControl, FormLabel, Button, Box} from "@material-ui/core";
import {AddAPhoto} from "@material-ui/icons";
import "./style.scss"

import React from 'react';

function TextEditor({setTextEditorState}) {

    return (
        <Card className="textEditor-container">
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
                    <textArea className="textEditor_body-input"/>
                </div>
                <Button onClick={()=>setTextEditorState(false)}>Cancel</Button>
                <Button>sumbit</Button>
            </Card>
        </Card>
    );
}

export default TextEditor;