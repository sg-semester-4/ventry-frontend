import React from "react";
import * as ReactBootstrap from "react-bootstrap";
import Logo from "../../assets/images/Ventry-Footer.svg";
import "./Styles/FooterStyle.css";
import "./Styles/LandingStyle.css";

function Footer() {
  return (
    <div className="footer">
      <ReactBootstrap.Container>
        <ReactBootstrap.Row>
          <ReactBootstrap.Col>
            <img src={Logo} alt="Ventry Logo" />
            <p>&copy; 2021 Ventry, All Right Reserved</p>
          </ReactBootstrap.Col>
        </ReactBootstrap.Row>
      </ReactBootstrap.Container>
    </div>
  );
}

export default Footer;
