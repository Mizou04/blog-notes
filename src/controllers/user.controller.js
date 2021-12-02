import React, { useCallback , useMemo} from 'react';
import {userDBref} from "../model/db.model";

export const UserContext = React.createContext()

function UserController(props) {

    const setUser = useCallback(async (path, userData) =>{
        await userDBref.setDoc(path, userData)
    })

    const updateUser = useCallback(async (path, data)=>{
        await userDBref.updateDoc(path, data)
    })

    const getUser = useCallback(async (path)=>{
        return await userDBref.getDoc(path);
    })

    const getUsersPath = useMemo(()=>{
        return userDBref.collectionPath;
    })

    return (
        <UserContext.Provider value={{getUsersPath, getUser, setUser, updateUser}}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserController;