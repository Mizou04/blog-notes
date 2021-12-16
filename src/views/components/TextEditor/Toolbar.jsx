import React from 'react';
import "./style.scss"

import {FormatBold, FormatItalic, FormatUnderlined} from "@material-ui/icons"

function Toolbar({boldHandler}) {
    return (
        <div className="editor_toolbar">
            <button onClick={boldHandler} className="editor_toolbar--button editor_toolbar--button-bold">B</button>
            <button className="editor_toolbar--button editor_toolbar--button-italic"><FormatItalic/></button>
            <button className="editor_toolbar--button editor_toolbar--button-underlined"><FormatUnderlined/></button>
        </div>
    );
}

export default Toolbar;