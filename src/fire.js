import firebase from 'firebase'
import 'firebase/firebase-firestore'

let firebaseConfig = {
  apiKey: "AIzaSyCb6OHFMb78oJkmStYqvnw2BK-u_pY42FQ",
    authDomain: "paymarv.firebaseapp.com",
    databaseURL: "https://paymarv.firebaseio.com",
    projectId: "paymarv",
    storageBucket: "paymarv.appspot.com",
    messagingSenderId: "785205899425",
    appId: "1:785205899425:web:9cac9f640954000e8680e0"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const db = fire.firestore()

export { db, fire }