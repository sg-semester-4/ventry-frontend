import React from "react";
import * as ReactBootstrap from "react-bootstrap";
import Logo from "../../assets/images/Ventry-Footer.png";
import "./Styles/Footer.css";
import "./Styles/Styles.css";

function Footer() {
  return (
    <div class="footer">
      <ReactBootstrap.Container >
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
