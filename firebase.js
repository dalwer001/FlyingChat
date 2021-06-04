import firebase from 'firebase';
import "firebase/firestore";
import "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAp0aXlSd5Ghf6UC_Ji58EhNJPFQ0EJ7xg",
    authDomain: "flyingchat-a1d78.firebaseapp.com",
    projectId: "flyingchat-a1d78",
    storageBucket: "flyingchat-a1d78.appspot.com",
    messagingSenderId: "1056061102535",
    appId: "1:1056061102535:web:ac828430e7e9a2716f61e2"
};

let app;

if(firebase.apps.length === 0)
{
   app= firebase.initializeApp(firebaseConfig);
}
else{
    app=firebase.app();
}

const db=app.firestore();
const auth=firebase.auth();

export {db,auth};