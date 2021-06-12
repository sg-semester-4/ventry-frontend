import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AuthenticatedRoute from "./AuthenticatedRoute";
import UnAuthenticatedRoute from "./UnAuthenticatedRoute";

import LandingPage from "../pages/LandingPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";

import ItemManagementPage from "../pages/ItemManagementPage";
import ProductManagementPage from "../pages/ProductManagementPage";
import ProductTransactionHistoryPage from "../pages/ProductTransactionHistoryPage";
import ProductForecastPage from "../pages/ProductForecastPage";
import ItemForecastPage from "../pages/ItemForecastPage";

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
            <UnAuthenticatedRoute path="/register" component={RegisterPage} />
            <UnAuthenticatedRoute path="/login" component={LoginPage} />
            <AuthenticatedRoute
              path="/managements/items"
              component={ItemManagementPage}
            />
            <AuthenticatedRoute
              path="/managements/products"
              component={ProductManagementPage}
            />
            <AuthenticatedRoute
              path="/histories/products"
              component={ProductTransactionHistoryPage}
            />
            <AuthenticatedRoute
              path="/forecasts/products"
              component={ProductForecastPage}
            />
            <AuthenticatedRoute
              path="/forecasts/items"
              component={ItemForecastPage}
            />
            <Route path="/" component={LandingPage} />
            <Route path="" component={ErrorPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default RootRoute;
