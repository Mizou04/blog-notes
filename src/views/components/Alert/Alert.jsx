import "./style.scss";
import {useState, useEffect, memo} from "react"
import {Button, Card, Paper} from "@material-ui/core";


function Alert({text, handler}) {
    return (
        <div className="prompt--container">
            <Card className="prompt--body" component={Paper}>
                <p>{text}</p>
                <Button onClick={handler} className="prompt--button" color="primary" variant="contained">ok</Button>
            </Card>
        </div>
    );
}

export default Alert;
