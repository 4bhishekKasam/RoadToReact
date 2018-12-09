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

// if (!firebase.apps.length) {
//   firebase.initializeApp(config);
// }

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    /* Helper */
    this.serverValue = firebase.database.ServerValue;
    this.emailAuthProvider = firebase.auth.EmailAuthProvider;
    //firebase api
    this.db = firebase.database();
    this.auth = firebase.auth();
  }
  //auth api

  // Sign Up
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  // Sign In
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  // Sign out
  doSignOut = () => this.auth.signOut();

  // Password Reset
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  // Password Change
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT
    });

  // merge auth and db api
  onAuthUserListener = (next, fallback) => {
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then(snap => {
            const dbUser = snap.val();
             // default empty roles
            // if (!dbUser.roles) {
            //   dbUser.roles = [];
            // }
            //merger auth & db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });
  };

  //user api

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");

  //message api

  message = uid => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref("messages");
}

export default Firebase;
