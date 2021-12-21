import "./style.scss";
import {useState, useEffect, memo} from "react"
import {CircularProgress, Card, Paper} from "@material-ui/core"



function Loader(props) {

    return (
        <div className="loader--container">
            <Card className="loader--body" component={Paper}>
                <CircularProgress aria-describedby="loading..." aria-busy="true" style={{color : "darkolivegreen"}} />
            </Card>
        </div>
    );
}

export default Loader;