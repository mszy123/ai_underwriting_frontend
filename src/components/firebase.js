// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZ1juwjU83r7vMzXY3vQZ16SQkVKS29_o",
    authDomain: "underwriting-ai.firebaseapp.com",
    projectId: "underwriting-ai",
    storageBucket: "underwriting-ai.appspot.com",
    messagingSenderId: "761487066770",
    appId: "1:761487066770:web:05a9c19d7eecd6eb60c84b"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, onAuthStateChanged };
