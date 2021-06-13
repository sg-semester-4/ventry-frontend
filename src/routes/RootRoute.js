import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AuthenticatedRoute from "./AuthenticatedRoute";
import UnAuthenticatedRoute from "./UnAuthenticatedRoute";

import LandingPage from "../pages/LandingPage";
import RegisterAuthPage from "../pages/RegisterAuthPage";
import LoginAuthPage from "../pages/LoginAuthPage";

import ItemManagementPage from "../pages/ItemManagementPage";
import ProductManagementPage from "../pages/ProductManagementPage";
import ProductTransactionHistoryPage from "../pages/ProductTransactionHistoryPage";
import InventoryControlHistoryPage from "../pages/InventoryControlHistoryPage";
import ProductForecastPage from "../pages/ProductForecastPage";
import ItemForecastPage from "../pages/ItemForecastPage";

import AccountProfilePage from "../pages/AccountProfilePage";

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
            <UnAuthenticatedRoute
              path="/auth/register"
              component={RegisterAuthPage}
            />
            <UnAuthenticatedRoute
              path="/auth/login"
              component={LoginAuthPage}
            />
            <AuthenticatedRoute
              path="/managements/items"
              component={ItemManagementPage}
            />
            <AuthenticatedRoute
              path="/managements/products"
              component={ProductManagementPage}
            />
            <AuthenticatedRoute
              path="/histories/items"
              component={InventoryControlHistoryPage}
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
            <AuthenticatedRoute
              path="/profiles/account"
              component={AccountProfilePage}
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
