import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

class HeaderComponent extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {} = this.state;
    // const isLoggedIn = AuthSession.handleIsLoggedIn();
    return (
      <div className="component header mb-5">
        <header>
          <nav className="navbar navbar-expand-md">
            <div className="navbar-brand">
              <Link to="/">Books App</Link>
            </div>
            <ul className="navbar-nav mr-auto">
              <Link className="nav-item mr-2" to="/displays">
                Displays
              </Link>
              <Link className="nav-item mr-2" to="/books">
                Books Management
              </Link>
              <Link className="nav-item mr-2" to="/categories">
                Categories Management
              </Link>
            </ul>
          </nav>
          <hr />
        </header>
      </div>
    );
  }
}

export default withRouter(HeaderComponent);
