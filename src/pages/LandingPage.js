import React, { Component } from "react";

import NavigationBar from "../components/LandingPage/NavigationBarComponent";
import Header from "../components/LandingPage/HeaderComponent";
import AboutUs from "../components/LandingPage/AboutUsComponent";
import WhyUs from "../components/LandingPage/WhyUsComponent";
import OurTeam from "../components/LandingPage/OurTeamComponent";
import Interested from "../components/LandingPage/InterestedComponent";
import Footer from "../components/LandingPage/FooterComponent";

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
