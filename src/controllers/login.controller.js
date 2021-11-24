import {useState, createContext, useEffect, useCallback} from "react"
import { useHistory } from "react-router";
import {onAuthStateChanged} from "firebase/auth"
import authModel from "../model/auth.model"

export const LoginContext = createContext();

export default function LoginController({children}){
    let [userInstance, setUserInstance] = useState(null);
    let history = useHistory();

    useEffect(()=>{
        console.log(userInstance)
    }, [userInstance]);

    onAuthStateChanged(authModel.auth, (user)=>{
        if(user){
            setUserInstance(user)
        } else {
            setUserInstance(null)
            history.replace("/")
        }
    })

    const loginHandler = useCallback(()=>{
        authModel.login();
    })

    const signOutHandler = useCallback(()=>{
        authModel.logout();
    })

    return (
        <LoginContext.Provider value={{loginHandler, signOutHandler, userInstance}}>
            {children}
        </LoginContext.Provider>
    )
}