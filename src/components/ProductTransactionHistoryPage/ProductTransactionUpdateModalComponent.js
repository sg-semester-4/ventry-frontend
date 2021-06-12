import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Modal, Nav } from "react-bootstrap";
import * as Yup from "yup";

import MessageModalComponent from "../MessageModalComponent";

import ProductItemsAPI from "../../apis/ProductItemsAPI";

import ProductCardImage from "../../assets/images/product-management-card-img.svg";
import "./Styles/ProductTransactionUpdateModalStyle.css";

const updateSchema = Yup.object().shape({
  quantity: Yup.number("Must be number")
    .required("Required")
    .min(0, "Atleast 0"),
  total_sell_price: Yup.number("Must be number")
    .required("Required")
    .min(0, "Atleast 0"),
});

class MainComponent extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { onSubmit, parent } = this.props;
    const { viewProductTransactionResponse } = parent.props.parent.state;
    return (
      <div className="main">
        <div className="form">
          <Formik
            validationSchema={updateSchema}
            initialValues={viewProductTransactionResponse.data}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {(props) => (
              <Form>
                <div className="row">
                  <fieldset className="form-group">
                    <label htmlFor="quantity">Transaction Quantity</label>
                    <Field
                      type="number"
                      name="quantity"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="quantity"
                      component="div"
                      className="text-danger"
                    />
                  </fieldset>
                </div>

                <div className="row">
                  <fieldset className="form-group">
                    <label htmlFor="total_sell_price">Total Sell Price</label>
                    <Field
                      type="number"
                      name="total_sell_price"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="total_sell_price"
                      component="div"
                      className="text-danger"
                    />
                  </fieldset>
                </div>

                <button
                  type="submit"
                  className="d-none"
                  ref={(ref) => {
                    this.refFormSubmitButton = ref;
                  }}
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

class ProductTransactionUpdateModalComponent extends Component {
  constructor() {
    super();
    this.state = {
      isShow: false,
      menu: "main",
    };
  }

  handleShow = () => {
    const { isShow } = this.state;
    this.setState({ isShow: !isShow });
  };

  handleSelectMenu = (eventKey, e) => {
    this.setState({ menu: eventKey });
  };

  render() {
    const { isShow, menu } = this.state;
    const { onSubmit, parent } = this.props;
    return (
      <Modal
        show={isShow}
        onHide={this.handleShow}
        centered
        className="component product-update-modal"
      >
        <Modal.Header closeButton className="header">
          <Modal.Title>Product Transaction Update</Modal.Title>
        </Modal.Header>

        <Nav variant="tabs" onSelect={this.handleSelectMenu}>
          <Nav.Item>
            <Nav.Link eventKey="main">Main</Nav.Link>
          </Nav.Item>
        </Nav>

        <Modal.Body className="body">
          {
            // Menu switch.
            {
              main: (
                <MainComponent
                  parent={this}
                  ref={(ref) => {
                    this.refMainComponent = ref;
                  }}
                  onSubmit={onSubmit}
                />
              ),
            }[menu]
          }
        </Modal.Body>

        <Modal.Footer className="footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.refMainComponent.refFormSubmitButton.click()}
          >
            Update Transaction
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ProductTransactionUpdateModalComponent;
