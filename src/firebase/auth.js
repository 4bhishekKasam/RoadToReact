// import { auth } from "./firebase";

// // Sign Up
// export const doCreateUserWithEmailAndPassword = (email, password) =>
//   auth.createUserWithEmailAndPassword(email, password);

// // Sign In
// export const doSignInWithEmailAndPassword = (email, password) =>
//   auth.signInWithEmailAndPassword(email, password);

// // Sign out
// export const doSignOut = () => auth.signOut();

// // Password Reset
// export const doPasswordReset = email => auth.sendPasswordResetEmail(email);

// // Password Change
// export const doPasswordUpdate = password =>
//   auth.currentUser.updatePassword(password);

// export const doSendEmailVerification = () =>
//   auth.currentUser.sendEmailVerification({
//     url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT
//   });

// /* merge auth abd db api */
// export const onAuthUserListener = (next, fallback) => {
//   auth.onAuthStateChanged(authUser => {
//     if (authUser) {
//       this.user(authUser.uid)
//         .once("value")
//         .then(snap => {
//           const dbUser = snap.val();
//           if (!dbUser.roles) {
//             dbUser.roles = [];
//           }
//           //merger auth & db user
//           authUser = {
//             uid: authUser.uid,
//             email: authUser.email,
//             emailVerified: authUser.emailVerified,
//             providerData: authUser.providerData,
//             ...dbUser
//           };
//           next(authUser);
//         });
//     } else {
//       fallback();
//     }
//   });
// };
