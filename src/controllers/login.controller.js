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
    const [ownerID, setOwnerID] = useState(null);

    let history = useHistory();


    useEffect(()=>{

        onAuthStateChanged(authModel.auth, async (user)=>{
            if(user){
                let document = await getUser(getUsersPath + user.uid);
                setOwnerID(user.uid)
                if(document && document.exists()){
                    await updateUser(getUsersPath + user.uid,
                        {
                            lastOnline : new Date().toLocaleString(),
                        });
                    document = await getUser(getUsersPath + user.uid);
                    setUserSession(document.data());
                    // history.replace("/profile/:userID")
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
                        document = await getUser(getUsersPath + user.uid);
                    }
                setUserSession(document.data());
                history.replace("/profile/"+user.uid)

            } else {
                setUserSession({});
                setOwnerID(null);
                // history.replace("/start")
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
        <LoginContext.Provider value={{loginHandler, signOutHandler, userSession, ownerID}}>
            {children}
        </LoginContext.Provider>
    )
}