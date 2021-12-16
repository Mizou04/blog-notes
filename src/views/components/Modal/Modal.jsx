import React from 'react';
import {Button} from "@material-ui/core"
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(()=>({
    body : {
        background : `hsl(342, 100%, 56%)`,
        width : 400,
        height : 160,
        border : "1px black solid",
        position : "absolute"
    },
    button : {
        borderRadius : "0px",
        margin :"0px 15px"
    },
    cancelBtn : {
        background : "linear-gradient(to bottom, hsl(362, 83%, 46%), hsl(362, 83%, 40%))",
        color : "white",
        padding : "10px 10px",
        '&:hover' : {
            background : "linear-gradient(to bottom, hsl(362, 83%, 40%), hsl(362, 83%, 35%))"
        }
    },
    sumbitBtn : {
        background : "linear-gradient(to bottom, hsl(132, 83%, 42%), hsl(137, 80%, 44%))",
        color : "white",
        padding : "10px 30px",
        '&:hover' : {
            background : "linear-gradient(to bottom, hsl(132, 83%, 37%), hsl(137, 80%, 40%))",
        }
    } 
}))


function Modal(props) {
    return (
        <>
            <div className={useStyles().body}>
                {props.text}
            </div>
            <div className="actions">
                <Button className={`${useStyles().cancelBtn} ${useStyles().button}`} onClick={props.cancelHandler}> {props.cancelTxt} </Button>
                <Button className={useStyles().sumbitBtn}>{props.sumbitTxt}</Button>
            </div>
        </>
    );
}

export default Modal;