import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import LandingPage from "./components/Landing";
import SignUpPage from "./components/SignUp";
import SignInPage from "./components/SignIn";
import PasswordForgetPage from "./components/PasswordForget";
import HomePage from "./components/Home";
//import AccountPage from "./components/Account";
import AdminPage from "./components/Admin";
import { withAuthentication } from "./components/Session";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navigation />
          <hr />
          <Route exact path={"/"} component={LandingPage} />
          <Route exact path={"/signup"} component={SignUpPage} />
          <Route exact path={"/signin"} component={SignInPage} />
          <Route exact path={"/pw-forget"} component={PasswordForgetPage} />
          <Route exact path={"/home"} component={HomePage} />
          <Route exact path={"/admin"} component={AdminPage} />
        </div>
      </Router>
    );
  }
}

export default withAuthentication(App);
