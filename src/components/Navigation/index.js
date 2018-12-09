import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Navigation.css";

import * as ROLES from "../../constants/roles";
import SignOutButton from "../SignOut";

const Navigation = ({ authUser }) =>
  authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />;

const NavigationAuth = ({ authUser }) => (
  <header className="header">
    <h1 className="logo">
      <Link to="/" >UserInfo</Link>
    </h1>
    <ul className="main-nav">
      <li>
        <Link to="/" className="navItem">
          Landing
        </Link>
      </li>

      <li>
        <Link to="/home" className="navItem">
          Home
        </Link>
      </li>

      {/* {authUser.roles.includes(ROLES.ADMIN) && (
      <li>
        <Link to={"/admin"}>Admin</Link>
      </li>
    )} */}
      <li>
        <SignOutButton />
      </li>
    </ul>
  </header>
);

const NavigationNonAuth = () => (
  <header className="header">
    <h1 className="logo">
      <Link to="/">Flexbox</Link>
    </h1>
    <ul className="main-nav">
      <li>
        <Link to="/" className="navItem">
          Landing
        </Link>
      </li>
      <li>
        <Link to={"/signin"} className="navItem">
          Sign In
        </Link>
      </li>
    </ul>
  </header>
);

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

export default connect(mapStateToProps)(Navigation);
