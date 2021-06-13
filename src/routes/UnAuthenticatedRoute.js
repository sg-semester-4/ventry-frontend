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
      return <Redirect to="/managements/items" />;
    }
    return (
      <div className="router un-authenticated">
        <Route {...this.props} />
      </div>
    );
  }
}

export default withRouter(AuthenticatedRoute);
