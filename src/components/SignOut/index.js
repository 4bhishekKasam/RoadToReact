import React from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../../firebase";

const SignOutButton = ({ firebase }) => {
  return (
    // <button type="button" onClick={firebase.doSignOut}>
    //   Sign Out
    // </button>
    <Link to="/" onClick={firebase.doSignOut} className="navItem">
      Signout
    </Link>
  );
};

export default withFirebase(SignOutButton);
