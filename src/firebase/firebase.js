import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBETDbOWxjn_wm736S2twzB_H-E2ZFbshs",
  authDomain: "reduxform-48a18.firebaseapp.com",
  databaseURL: "https://reduxform-48a18.firebaseio.com",
  projectId: "reduxform-48a18",
  storageBucket: "reduxform-48a18.appspot.com",
  messagingSenderId: "180791962148"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export { db, auth };
