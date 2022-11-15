import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,signInWithPopup, signOut} from 'firebase/auth'



const firebaseConfig = {
  apiKey: "AIzaSyBxT5Aprdr9VJ47i5Wa2T9gw11hIr70NgA",
  authDomain: "careerguru-ef83e.firebaseapp.com",
  projectId: "careerguru-ef83e",
  storageBucket: "careerguru-ef83e.appspot.com",
  messagingSenderId: "263754807880",
  appId: "1:263754807880:web:844413622b35cc8d18b67d",
  measurementId: "G-BKRZYPJND0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

const provider = new GoogleAuthProvider()


export const signInwitgGoogle = () =>{

    signInWithPopup(auth,provider).then((result)=>{

        console.log(result);

    })
    .catch((error)=>{
        console.log(error);
    })
}

export const googleSignout = () => {

    signOut(auth,provider).then((result)=>{

        console.log("success");
    }) 
  
    .catch((error)=>{
        console.log(error);
    })
 }
 