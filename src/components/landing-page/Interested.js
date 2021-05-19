import React from "react";
import * as ReactBootstrap from "react-bootstrap";
import AwanKiri from "../../assets/images/awan-kiri-atas.png";
import AwanKanan from "../../assets/images/awan-kanan-bawah.png";
import "./Styles/Interested.css";
import "./Styles/Styles.css";

function Interested() {
  return (
    <div class="interested">
      <ReactBootstrap.Container >
        <ReactBootstrap.Row className="awan-kiri">
          <img src={AwanKiri} alt="Awan Kiri Atas" />
        </ReactBootstrap.Row>
        <ReactBootstrap.Row>
          <ReactBootstrap.Col className="our-product">
            <h1>Interested to Use Our product?</h1>
            <p>Try Ventry for free by click the button in the below </p>
            <ReactBootstrap.Button className="button" variant="light" >Get Started!</ReactBootstrap.Button>
          </ReactBootstrap.Col>
        </ReactBootstrap.Row>
        <ReactBootstrap.Row className="awan-kanan">
          <img src={AwanKanan} alt="Awan Kanan Bawah" />
        </ReactBootstrap.Row>
      </ReactBootstrap.Container>
    </div>
  );
}

export default Interested;
