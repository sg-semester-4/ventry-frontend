import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import LogoImage from "../assets/images/auth-logo-img.svg";
import AccountImage from "../assets/images/profile-account-img.svg";
import "./Styles/AccountProfileStyle.css";

import AuthSessionService from "../services/AuthSessionService";

import AccountsAPI from "../apis/AccountsAPI";

import MessageModalComponent from "../components/MessageModalComponent";

const updateSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

class AccountProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewAccountResponse: {
        statusMessage: "",
        statusCode: 0,
        data: {},
      },
      updateAccountResponse: {
        statusMessage: "",
        statusCode: 0,
        data: {},
      },
    };
  }

  async componentDidMount() {
    await this.handleFetchAccount();
  }

  handleFetchAccount = () => {
    const account = AuthSessionService.getAccount();

    return AccountsAPI.readOneByID(account.id)
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({
            viewAccountResponse: { status, message, data },
          });
        } else {
          this.refMessageModalComponent.setState({
            title: "Status",
            content: message,
          });
          this.refMessageModalComponent.handleShow();
        }
      })
      .catch((err) => {
        console.log(err);
        this.refMessageModalComponent.setState({
          title: "Status",
          content: "Error has occurred",
        });
        this.refMessageModalComponent.handleShow();
      })
      .finally(() => {});
  };

  handleSubmitUpdate = (values, actions) => {
    const { name, email, password } = values;
    const account = AuthSessionService.getAccount();

    AccountsAPI.updateOneByID(account.id, {
      name,
      email,
      password,
    })
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({
            updateAccountResponse: { status, message, data },
          });
        }

        this.refMessageModalComponent.setState({
          title: "Status",
          content: message,
        });
        this.refMessageModalComponent.handleShow();
      })
      .catch((err) => {
        console.log(err);
        this.refMessageModalComponent.setState({
          title: "Status",
          content: "Error has occurred",
        });
        this.refMessageModalComponent.handleShow();
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  render() {
    const { viewAccountResponse } = this.state;
    return (
      <div className="page account-profile">
        <MessageModalComponent
          ref={(ref) => {
            this.refMessageModalComponent = ref;
          }}
        />
        <div className="title">
          <h1>Account Profile</h1>
        </div>
        <div className="image">
          <img
            src={viewAccountResponse.data.image_url || AccountImage}
            onError={(e) => {
              e.target.src = AccountImage;
            }}
            alt="account"
          />
        </div>
        <div className="form">
          <Formik
            validationSchema={updateSchema}
            initialValues={viewAccountResponse.data}
            onSubmit={this.handleSubmitUpdate}
            enableReinitialize
          >
            {(props) => (
              <Form>
                <fieldset className="form-group">
                  <label htmlFor="name">Name</label>
                  <Field type="text" name="name" className="form-control" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field type="email" name="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label htmlFor="password">New Password</label>
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-danger"
                  />
                </fieldset>
                <button type="submit" className="btn btn-primary">
                  Update Account
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default AccountProfilePage;
