import React, { Component } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import AuthService from "../services/AuthSession";

class AuthenticatedRoute extends Component {
  constructor(props) {
    super();
    this.state = { isAuthenticated: true };
  }

  render() {
    // const isAuthenticated = AuthService.handleIsLoggedIn();
    const { isAuthenticated } = this.state;

    if (isAuthenticated) {
      return <Route {...this.props} />;
    }
    return <Redirect to="/login" />;
  }
}

export default withRouter(AuthenticatedRoute);
