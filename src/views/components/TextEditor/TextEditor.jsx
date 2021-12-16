import "./style.scss";
import {memo, useRef, useContext, useEffect, useCallback, useState, useMemo, createRef} from "react"
// import {Editor, EditorState, RichUtils} from "draft-js"
// import "draft-js/dist/Draft.css";
// import Toolbar from "./Toolbar";
import "./style.scss"


import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header"
import List from "@editorjs/list"
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import Underline from "@editorjs/underline";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code"
import SimpleImage from "@editorjs/simple-image"


function TextEditor({setData, content}) {
    const editorReference = useRef(null);
    let editor;
    useEffect(()=>{
        editor = new EditorJS({
            holder : editorReference.current,
            toolbar : ['Header', 'Text', "List", "Image"],
            tools : {
                header : Header,
                list : List,
                quote : Quote,
                image : {class : SimpleImage, inlineToolbar : true},
                marker : Marker,
                inlineCode: {
                  class: InlineCode,
                  shortcut: 'CMD+SHIFT+M',
                },
                underline : Underline,
            },
            onChange : () => saveHandler(),
            data : content
          })

    
    
        function saveHandler() {
            editor.save().then(content=>{
                // console.log(data);
                setData(data => {return {...data, content : content}});
            }).catch(reason=>{
                // console.trace(reason)
            })

        return false
    }}, [null])

    return (
        <div id='editorjs' ref={editorReference} className="textEditor_body--editor">
            {/* <button onClick={saveHandler}>save</button> */}
        </div>
    );
}

export default memo(TextEditor);