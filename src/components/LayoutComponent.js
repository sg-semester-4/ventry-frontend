import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";

class LayoutComponent extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { children } = this.props;
    return (
      <div className="component header mb-5">
        <HeaderComponent />
        {children}
        <FooterComponent />
      </div>
    );
  }
}

export default withRouter(LayoutComponent);
