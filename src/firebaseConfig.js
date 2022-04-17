import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCjqxeALYb0YyEWI2WdAtyPibC2AG2kDyA",
    authDomain: "facebook-messenger-clone-3a1a3.firebaseapp.com",
    projectId: "facebook-messenger-clone-3a1a3",
    storageBucket: "facebook-messenger-clone-3a1a3.appspot.com",
    messagingSenderId: "669890184548",
    appId: "1:669890184548:web:b2543df8afd075b4e32671"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;