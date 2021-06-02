import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";

import TestPage from "../pages/TestPage";
import DisplaysPage from "../pages/DisplaysPage";
import BooksPage from "../pages/BooksPage";
import CategoriesPage from "../pages/CategoriesPage";
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
      <div className="root page">
        <Router>
          <Switch>
            <Route path="/test" component={TestPage} />
            <Route path="/displays" component={DisplaysPage} />
            <Route path="/books" component={BooksPage} />
            <Route path="/categories" component={CategoriesPage} />

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
