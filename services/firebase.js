import { initializeApp, getApp } from "firebase/app";
import { getDatabase, set, ref } from "firebase/database";

let app
try{
    app=getApp()
}catch (error){
const firebaseConfig = {
    apiKey: "AIzaSyB4MAqqaoys6iVTPiF0Ct4n3Gjyh80mCLc",
    authDomain: "projetop2-d2dbb.firebaseapp.com",
    databaseURL: "https://projetop2-d2dbb-default-rtdb.firebaseio.com",
    projectId: "projetop2-d2dbb",
    storageBucket: "projetop2-d2dbb.appspot.com",
    messagingSenderId: "533424267968",
    appId: "1:533424267968:web:49831cac0a61e92fc90325"
};

 app = initializeApp(firebaseConfig);
}

const db = getDatabase(app)

export{db}