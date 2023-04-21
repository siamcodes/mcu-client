
import firebase from "firebase/app";
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyADHmKBGZ0ImcuRU6zGZFJYuyguuMzEbcI",
  authDomain: "mern-ecommerce-web.firebaseapp.com",
  databaseURL: "https://mern-ecommerce-web.firebaseio.com",
  projectId: "mern-ecommerce-web",
  storageBucket: "mern-ecommerce-web.appspot.com",
  messagingSenderId: "540737999132",
  appId: "1:540737999132:web:08964181b62e83c4436ad9",
  measurementId: "G-S1J7RJENGM" 
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

