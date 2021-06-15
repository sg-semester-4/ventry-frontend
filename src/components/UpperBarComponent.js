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
                    <img roundedCircle style={{ width:"7vh"}}
                    src={viewAccountResponse.data.image_url || AccountImage}
                    onError={(e) => {
                        e.target.src = AccountImage;
                    }}
                    alt="account"
                    />
                </div>
                <div className="ddlUser">
                {/* <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
                    <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
                        <img
                            className="user-avatar rounded-circle mr-2"
                            src={require("")}
                            alt="User Avatar"
                        />{" "}
                        <span className="d-none d-md-inline-block">Sierra Brooks</span>
                        </DropdownToggle>
                        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
                        <DropdownItem tag={Link} to="user-profile">
                            <i className="material-icons">&#xE7FD;</i> Profile
                        </DropdownItem>
                        <DropdownItem tag={Link} to="edit-user-profile">
                            <i className="material-icons">&#xE8B8;</i> Edit Profile
                        </DropdownItem>
                        </Collapse>
                    </NavItem> */}
                    <NavDropdown title={viewAccountResponse.data.name} id="nav-dropdown">
                        <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
                        <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => this.handleLogout()}>Logout</NavDropdown.Item>
                    </NavDropdown>
                    {/* <DropdownButton id="" title="Name">
                        <Dropdown.Item as="button">Action</Dropdown.Item>
                        <Dropdown.Item as="button">Another action</Dropdown.Item>
                        <Dropdown.Item as="button"className="btn btn-danger"onClick={() => this.handleLogout()}>Logout</Dropdown.Item>
                    </DropdownButton> */}
                </div>
            </div>
        )
    }
}

export default UpperBarComponent;