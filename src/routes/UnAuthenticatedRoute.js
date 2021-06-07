import React, { Component } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import AuthSessionService from "../services/AuthSessionService";

class AuthenticatedRoute extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    const isAuthenticated = AuthSessionService.isLoggedIn();

    if (isAuthenticated) {
      return <Redirect to="/itemManagement" />;
    }
    return <Route {...this.props} />;
  }
}

export default withRouter(AuthenticatedRoute);
