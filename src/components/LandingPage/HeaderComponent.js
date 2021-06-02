import React from "react";
import * as ReactBootstrap from "react-bootstrap";
import HeaderImg from "../../assets/images/Header-Img.png";
import "./Styles/HeaderStyle.css";
import "./Styles/LandingStyle.css";

function Header() {
  return (
    <div className="header" id="header">
      <ReactBootstrap.Container>
        <ReactBootstrap.Row lg>
          <ReactBootstrap.Col className="header-title">
            <h1>Online Inventory Software to Make Your Business Easier</h1>
            <p>
              We help your businesses to do managment inventory easier and also
              help you to predict the stock of your product in the next few
              days!
            </p>
            <ReactBootstrap.Button variant="primary" className="button">
              Get Started!
            </ReactBootstrap.Button>
          </ReactBootstrap.Col>
          <ReactBootstrap.Col lg>
            <ReactBootstrap.Image
              src={HeaderImg}
              alt="Header Image"
              className="header-img"
            />
          </ReactBootstrap.Col>
        </ReactBootstrap.Row>
      </ReactBootstrap.Container>
    </div>
  );
}

export default Header;
