import {useState, createContext, useEffect, useCallback, useContext, useMemo} from "react"
import { useHistory } from "react-router";
import {} from "firebase/app"
import {onAuthStateChanged} from "firebase/auth"
import authModel from "../model/auth.model"
import {UserContext} from "./user.controller"

export const LoginContext = createContext();

export default function LoginController({children}){
    const {getUser, setUser, updateUser, getUsersPath} = useContext(UserContext);
    
    const [userSession, setUserSession] = useState({}); 

    let history = useHistory();

    useEffect(()=>{
        console.log(userSession)
    }, [userSession]);

    useEffect(()=>{

        onAuthStateChanged(authModel.auth, async (user)=>{
            if(user){
                let document = await getUser(getUsersPath + user.uid);
                if(document && document.exists()){
                    await updateUser(getUsersPath + user.uid,
                        {
                            lastOnline : new Date().toLocaleString(),
                        });
                    let userDoc = await getUser(getUsersPath + user.uid);
                    setUserSession(userDoc.data());
                    history.replace("/")
                } else {
                    await setUser(getUsersPath + user.uid, {
                    name : user.displayName,
                    profilePic : user.photoURL,
                    joined : new Date().toLocaleString(),
                    descritpion : "",
                    articles : [],
                    lastOnline : new Date().toLocaleString(),
                    id : user.uid
                    });
                    let userDoc = await getUser(getUsersPath + user.uid);
                    setUserSession(userDoc.data());
                    history.replace("/")
                }
            } else {
                setUserSession({});
                history.replace("/start")
            }
        })
    }, [authModel.auth])

    const loginHandler = useCallback( ()=>{
        authModel.login();
    })

    const signOutHandler = useCallback( ()=>{
        authModel.logout();
    })

    return (
        <LoginContext.Provider value={{loginHandler, signOutHandler, userSession}}>
            {children}
        </LoginContext.Provider>
    )
}