import React, { Component } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

import SideBarComponent from "../components/SideBarComponent";

import AuthSessionService from "../services/AuthSessionService";

import "./Styles/AuthenticatedStyle.css";

class AuthenticatedRoute extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    const isAuthenticated = AuthSessionService.isLoggedIn();

    if (isAuthenticated) {
      return (
        <div className="router authenticated">
          <SideBarComponent />
          <Route {...this.props} />
        </div>
      );
    }
    return <Redirect to="/login" />;
  }
}

export default withRouter(AuthenticatedRoute);
