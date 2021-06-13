import React, { Component } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";

import LogoImage from "../assets/images/Logo-Nav.svg";
import AccountImage from "../assets/images/profile-account-img.svg";
import "./Styles/SideBarStyle.css";

import AuthSessionService from "../services/AuthSessionService";

import AccountsAPI from "../apis/AccountsAPI";

import MessageModalComponent from "../components/MessageModalComponent";

class SideBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className="component side-bar"
        style={{
          display: "flex",
          height: "100vh",
          overflow: "scroll initial",
        }}
      >
        <CDBSidebar textColor="black" backgroundColor="white">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large" />}>
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              <img src={LogoImage} alt="logo" />
            </a>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink
                exact
                to="/managements/items"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem icon="table">
                  Item Management
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                exact
                to="/managements/products"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem icon="table">
                  Product Management
                </CDBSidebarMenuItem>
              </NavLink>

              <NavLink
                exact
                to="/histories/items"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem icon="history">
                  Inventory Control History
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                exact
                to="/histories/products"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem icon="history">
                  Product Transaction History
                </CDBSidebarMenuItem>
              </NavLink>

              <NavLink
                exact
                to="/forecasts/items"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem icon="chart-line">
                  Item Forecast
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                exact
                to="/forecasts/products"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem icon="chart-line">
                  Product Forecast
                </CDBSidebarMenuItem>
              </NavLink>

              <NavLink
                exact
                to="/profiles/account"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem icon="user">
                  Account Profile
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter style={{ textAlign: "center" }}>
            <div
              className="sidebar-btn-wrapper"
              style={{
                padding: "20px 5px",
              }}
            >
              Ventry © 2021
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    );
  }
}

export default SideBarComponent;
