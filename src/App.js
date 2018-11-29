import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
//import Navigation from "./components/Navigation";
import LandingPage from "./components/Landing";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* <Navigation /> */}
          <hr />
          <Route exact path={"/"} component={LandingPage} />
        </div>
      </Router>
    );
  }
}

export default App;
