import React from "react";
import * as ReactBootstrap from "react-bootstrap";
import Kharisma from "../../assets/images/kharisma.png";
import Julyo from "../../assets/images/Julyo.png";
import Kevin from "../../assets/images/kevin.png";
import "./Styles/OurTeam.css";
import "./Styles/Styles.css";

function OurTeam() {
  return (
    <div class="our-team" id="our-team">
      <ReactBootstrap.Container >
        <ReactBootstrap.Row>
          <ReactBootstrap.Col>
            <h2>Our <span>Team</span></h2>
          </ReactBootstrap.Col>
        </ReactBootstrap.Row>
        <ReactBootstrap.Row className="member">
          <ReactBootstrap.Col md>
            <img src={Kharisma} alt="Kharisma" />
            <h3>Muhammad {`\n`} Kharisma Azhari</h3>
            <p>2301925564</p>
            <span>Computer Science</span>
          </ReactBootstrap.Col>
          <ReactBootstrap.Col md>
            <img src={Julyo} alt="Julyo" />
            <h3>Julyo</h3>
            <p>2301902245</p>
            <span>Computer Science</span>
          </ReactBootstrap.Col>
          <ReactBootstrap.Col md>
            <img src={Kevin} alt="Kevin Siek" />
            <h3>Kevin Siek Widjanarko</h3>
            <p>2301880414</p>
            <span>Computer Science</span>
          </ReactBootstrap.Col>
        </ReactBootstrap.Row>
      </ReactBootstrap.Container>
    </div>
  );
}

export default OurTeam;
