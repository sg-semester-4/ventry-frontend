import React, { Component } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import AuthSessionService from "../services/AuthSessionService";

class AuthenticatedRoute extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    const isAuthenticated = AuthSessionService.handleIsLoggedIn();

    if (isAuthenticated) {
      return <Route {...this.props} />;
    }
    return <Redirect to="/login" />;
  }
}

export default withRouter(AuthenticatedRoute);
