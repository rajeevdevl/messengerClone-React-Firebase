import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional

    apiKey: "AIzaSyD1yUokzKOPtmXZNKz2K82rVF_LiJr0G0c",
    authDomain: "messenger-react-firebase.firebaseapp.com",
    databaseURL: "https://messenger-react-firebase.firebaseio.com",
    projectId: "messenger-react-firebase",
    storageBucket: "messenger-react-firebase.appspot.com",
    messagingSenderId: "1059989449555",
    appId: "1:1059989449555:web:1a9e6b5e0f88265a6ecfa6",
    measurementId: "G-5CG9RF56V3"

})

const db = firebase.firestore();

export default db;