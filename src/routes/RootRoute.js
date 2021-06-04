import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";

import TestPage from "../pages/TestPage";
import ErrorPage from "../pages/ErrorPage";

import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";

class RootRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="router root">
        <Router>
          <Switch>
            <Route path="/test" component={TestPage} />

            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/" component={LandingPage} />
            <Route path="" component={ErrorPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default RootRoute;
