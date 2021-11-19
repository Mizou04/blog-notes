import React from 'react';
import "./style.scss";
import {Input, Button, Divider, InputLabel} from "@material-ui/core"
import {} from "@material-ui/icons"

function LoginPage(props) {
    return (
        <body className="login_page">
            <div className="login_page--display">
                <div className="login_page--form">
                    <InputLabel className="login_page--form-label" itemID="connectWithGoogle">
                        <p>connect with google account :</p>
                        <Button variant="outlined" id="connectWithGoogle" className="login_page--connect login_page--connect-google"/> 
                    </InputLabel>
                    <Divider>or</Divider>
                    <InputLabel className="login_page--form-label" itemId="connectWithEmail">
                        <p>via email :</p> 
                        <Input id="connectWithEmail" className="login_page--connect login_page--connect-email" placeholder="example@example.com"/>
                    </InputLabel>
                    <InputLabel itemId="password">
                        <p>and password :</p> 
                        <Input id="password" className="login_page--connect login_page--connect-password" type="password" placeholder="********"/>
                    </InputLabel>
                </div>        
            </div>
        </body>
    );
}

export default LoginPage;