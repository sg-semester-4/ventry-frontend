import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import LogoImage from "../assets/images/auth-logo-img.svg";
import SplashImage from "../assets/images/auth-register-img.svg";
import "./Styles/RegisterStyle.css";

import AuthenticationsAPI from "../apis/AuthenticationsAPI";
import MessageModalComponent from "../components/MessageModalComponent";

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerResponse: {
        statusMessage: "",
        statusCode: 0,
        data: {},
      },
    };
  }

  handleSubmitRegister = (values, actions) => {
    const { name, email, password } = values;
    AuthenticationsAPI.register({ name, email, password })
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({
            registerResponse: { status, message, data },
          });
        }

        this.messageModalComponent.setState({
          title: "Status",
          content: message,
        });
        this.messageModalComponent.handleShow();
      })
      .catch((err) => {
        console.log(err);
        this.messageModalComponent.setState({
          title: "Status",
          content: "Error has occurred",
        });
        this.messageModalComponent.handleShow();
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
            <div className="text">Sign-up your account now!</div>
          </div>
        </div>
        <MessageModalComponent
          ref={(ref) => {
            this.messageModalComponent = ref;
          }}
        />
        <div className="right-section">
          <div className="title">
            <h1>Sign-up</h1>
          </div>
          <div className="form">
            <Formik
              validationSchema={registerSchema}
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              onSubmit={this.handleSubmitRegister}
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
                  <fieldset className="form-group">
                    <label htmlFor="confirmPassword">Confirm password</label>
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
                    Register
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          <div className="suggest-login">
            <div className="text">
              Already have an account? Login at <a href="/login">here</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterPage;
