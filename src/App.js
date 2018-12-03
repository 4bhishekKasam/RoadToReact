import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
//import Navigation from "./components/Navigation";
import LandingPage from "./components/Landing";
import SignUpPage from "./components/SignUp";
import SignInPage from "./components/SignIn";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* <Navigation /> */}
          <hr />
          <Route exact path={"/"} component={LandingPage} />
          <Route exact path={"/signup"} component={SignUpPage} />
          <Route exact path={"/signin"} component={SignInPage} />
        </div>
      </Router>
    );
  }
}

export default App;
