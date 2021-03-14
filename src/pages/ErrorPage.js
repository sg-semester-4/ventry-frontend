import React, { Component, Fragment } from "react";

class ErrorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment className="error page">
        <h1>404 not found.</h1>
      </Fragment>
    );
  }
}

export default ErrorPage;
