import { memo, useContext, useEffect } from 'react';
import "./style.scss";
import {Input, Button, Divider, InputLabel} from "@material-ui/core"
import {LoginContext} from "../../../controllers/login.controller"


function LoginPage(props) {
    const {loginHandler, userInstance} = useContext(LoginContext);

    return (
        <main className="login_page">
            <div className="login_page--display">
                <div className="login_page--form-google">
                    <InputLabel className="login_page--form-label login_page--form_label-google" itemID="connectWithGoogle">
                        <p style={{marginBottom : "20px"}}>connect with google account :</p>
                        <Button variant="outlined" onClick={loginHandler} id="connectWithGoogle" className="login_page--connect login_page--connect-google">
                            connect with Google    
                        </Button> 
                    </InputLabel>
                </div>
                <form className='login_page--form-mail' action="" method="post">
                <span style={{color : "red" ,marginTop : "-20", marginBottom : "20"}}>! this is not availabe, use Google login only</span>
                    <InputLabel className="login_page--form-label login_page--form_label-email" itemID="connectWithEmail">
                        <p>via email :</p> 
                        <Input id="connectWithEmail" className="login_page--connect login_page--connect-email" placeholder="example@example.com"/>
                    </InputLabel>
                    <hr/>
                    <InputLabel style={{marginBottom : "20px"}} itemId="password">
                        <p>and password :</p> 
                        <Input id="password" autoComplete="current-password" className="login_page--connect login_page--connect-password" type="password" placeholder="********"/>
                        <a href="/start">don't have an account?</a>
                    </InputLabel>
                    <Button variant="contained" className="login_page--button-sumbit" color="primary">Login</Button>
                </form>
            </div>
        </main>
    );
}

export default memo(LoginPage);