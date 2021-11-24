import {fireApp} from "./firebase.model";
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();


let auth = getAuth(fireApp);

// const authObject = {
//     auth : getAuth(fireApp),
//     googleProvider : new GoogleAuthProvider(),
//     login(){
//         let returnedData = null;
//         signInWithPopup(this.auth, this.googleProvider)
//         .then((result) => {
//             // This gives you a Google Access Token. You can use it to access the Google API.
//             const credential = GoogleAuthProvider.credentialFromResult(result);
//             const token = credential.accessToken;
//             // The signed-in user info.
//             returnedData = result.user;
//         }).catch((error) => {
//             // Handle Errors here.
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // The email of the user's account used.
//             const email = error.email;
//             // The AuthCredential type that was used.
//             // const credential = GoogleAuthProvider.credentialFromError(error);
//             // ...
//             returnedData = error
//             // history.replace("/")
//         });
//         return returnedData;
//     },

//     logout(){
//         signOut(this.auth)
//     }
// };
// class ConnectModel{
//     constructor(){
//     }
//     login(){}
//     logout(){}
// }

class AuthModel{
    constructor(){
        this.auth = getAuth(fireApp);
        this.googleProvider = new GoogleAuthProvider();
    }

    login(){
        let returnedData = null;
        signInWithPopup(this.auth , this.googleProvider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            returnedData = result.user;
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            returnedData = error
            // history.replace("/")
        });
        return returnedData;
    }

    logout(){
        signOut(this.auth)
    }
};

export default new AuthModel();

