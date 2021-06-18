import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { NavDropdown, Image } from 'react-bootstrap';

import AccountImage from "../assets/images/profile-account-img.svg";

import AccountsAPI from "../apis/AccountsAPI";

import AuthSessionService from "../services/AuthSessionService";

import "./Styles/UpperBarStyle.css"

class UpperBarComponent extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            viewAccountResponse: {
                statusMessage: "",
                statusCode: 0,
                data: {},
            },
            visible: false,
            navigate:false
        };
    }

    async componentDidMount() {
        await this.handleFetchAccount();
    }

    toggleUserActions = () => {
        this.setState({
          visible: !this.state.visible
        });
    }

    handleFetchAccount = () => {
        const account = AuthSessionService.getAccount();

        return AccountsAPI.readOneByID(account.id)
        .then((res) => {
        const { status, message, data, name } = res.data;
        this.setState({
            viewAccountResponse: { status, message, data }
        });
      })
    };

    handleLogout = () => {
        try {
          AuthSessionService.logoutSucceed();
        } catch (err) {
          AuthSessionService.logoutFailed();
        }
        this.setState({ navigate:true });
    };

    render(){
        const { navigate } = this.state;
        const { viewAccountResponse } = this.state;

        if(navigate){
            return <Redirect to="/" push={true} />
        }

        return (
            <div className="upper-bar">
                <div className="ImageUser">
                    <img roundedCircle style={{ width:"6vh"}}
                    src={viewAccountResponse.data.image_url || AccountImage}
                    onError={(e) => {
                        e.target.src = AccountImage;
                    }}
                    alt="account"
                    />
                </div>
                <div className="ddlUser">
                    <NavDropdown title={viewAccountResponse.data.name} id="nav-dropdown">
                        <NavDropdown.Item href="/profiles/account">Account Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() => this.handleLogout()}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </div>
            </div>
        )
    }
}

export default UpperBarComponent;