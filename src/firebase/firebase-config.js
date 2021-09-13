import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCrR2sCp8TG6DGekH88L3Lgxxpq-Xeb4yk",
    authDomain: "react-app-cursos-f7c7d.firebaseapp.com",
    projectId: "react-app-cursos-f7c7d",
    storageBucket: "react-app-cursos-f7c7d.appspot.com",
    messagingSenderId: "384059041504",
    appId: "1:384059041504:web:b6fb9c041603338338d285"
  };

  // Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);

const db = getFirestore(firebase);
const googleAuthProvider = new GoogleAuthProvider();

export {
    firebase,
    db,
    googleAuthProvider
}