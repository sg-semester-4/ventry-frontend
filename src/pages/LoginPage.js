import React, { Component, Fragment } from "react";
import LogoImage from "../assets/images/auth-logo-img.svg";

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page register">
        <div className="left-section">
          <div className="logo">
            <img src={LogoImage} alt="ventry-logo" />
          </div>
        </div>
        <div className="right-section">
          <div />
        </div>
      </div>
    );
  }
}

export default RegisterPage;
