import React, { Component, Fragment } from "react";

import NavigationBar from '../components/landing-page/NavigationBar';
import Header from '../components/landing-page/Header';
import AboutUs from '../components/landing-page/AboutUs';
import WhyUs from '../components/landing-page/WhyUs';
import OurTeam from '../components/landing-page/OurTeam';
import Interested from '../components/landing-page/Interested';
import Footer from '../components/landing-page/Footer';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="page landing">
        <NavigationBar />
        <Header />
        <AboutUs />
        <WhyUs />
        <OurTeam />
        <Interested />
        <Footer />
      </div>
    );
  }
}

export default LandingPage;
