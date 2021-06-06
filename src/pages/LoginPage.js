import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import LogoImage from "../assets/images/auth-logo-img.svg";
import SplashImage from "../assets/images/auth-register-img.svg";
import "./Styles/LoginStyle.css";

import AuthenticationsAPI from "../apis/AuthenticationsAPI";
import AuthSessionService from "../services/AuthSessionService";
import MessageModalComponent from "../components/MessageModalComponent";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginResponse: { status: 0, message: "", data: {} },
    };
  }

  handleSubmitLogin = (values, actions) => {
    const { email, password } = values;
    AuthenticationsAPI.login({ email, password })
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({
            loginResponse: { status, message, data },
          });
          AuthSessionService.loginSucceed(data);
          this.props.history.push(`/item-management`);
        }

        this.refMessageModalComponent.setState({
          title: "Status",
          content: message,
        });
        this.refMessageModalComponent.handleShow();
      })
      .catch((err) => {
        console.log(err);
        // this.refMessageModalComponent.setState({
        //   title: "Status",
        //   content: "Error has occurred",
        // });
        // this.refMessageModalComponent.handleShow();
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  render() {
    return (
      <div className="page register">
        <div className="left-section">
          <div className="logo">
            <img src={LogoImage} alt="ventry-logo" />
          </div>
          <div className="splash">
            <img src={SplashImage} alt="ventry-logo" />
          </div>
          <div className="description">
            <div className="text">Sign-in your account now!</div>
          </div>
        </div>
        <MessageModalComponent
          ref={(ref) => {
            this.refMessageModalComponent = ref;
          }}
        />
        <div className="right-section">
          <div className="title">
            <h1>Sign-in</h1>
          </div>
          <div className="form">
            <Formik
              validationSchema={loginSchema}
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={this.handleSubmitLogin}
              enableReinitialize
            >
              {(props) => (
                <Form>
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
                    <label htmlFor="password">Password</label>
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
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          <div className="suggest-login">
            <div className="text">
              Didn&apos;t have an account? Register at{" "}
              <a href="/register">here</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
