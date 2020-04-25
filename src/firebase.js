import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyA8qDcwDjkns3zXuIrEAYK7RwqxS7TXg4o",
    authDomain: "boringproject-f5028.firebaseapp.com",
    databaseURL: "https://boringproject-f5028.firebaseio.com",
    projectId: "boringproject-f5028",
    storageBucket: "boringproject-f5028.appspot.com",
    messagingSenderId: "827659133164",
    appId: "1:827659133164:web:ed9c608bceba70feccc5c9",
    measurementId: "G-FNF7CV9318"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider()

export const db = firebase.firestore();
