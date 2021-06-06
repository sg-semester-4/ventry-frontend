import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Modal, Nav } from "react-bootstrap";
import * as Yup from "yup";

import ItemCardImage from "../../assets/images/item-management-card-img.svg";
import "./Styles/ItemInsertModalStyle.css";

const insertSchema = Yup.object().shape({
  code: Yup.string("Must be string").required("Required"),
  name: Yup.string("Must be string").required("Required"),
  available_quantity: Yup.number("Must be number")
    .required("Required")
    .min(0, "Atleast 0"),
  estimate_quantity: Yup.number("Must be number")
    .required("Required")
    .min(0, "Atleast 0"),
  max_estimate_quantity: Yup.number("Must be number")
    .required("Required")
    .min(0, "Atleast 0"),
  unit_type: Yup.string("Must be string").required("Required"),
  unit_cost_price: Yup.number("Must be number")
    .required("Required")
    .min(0, "Atleast 0"),
  description: Yup.string("Must be string"),
});

class MainComponent extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { onSubmit } = this.props;
    return (
      <div className="main form">
        <Formik
          validationSchema={insertSchema}
          initialValues={{
            code: "",
            name: "",
            available_quantity: 0,
            estimate_quantity: 0,
            max_estimate_quantity: 0,
            unit_type: "",
            unit_cost_price: 0,
            description: "",
            image_url: "",
          }}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {(props) => (
            <Form>
              <div className="row">
                <fieldset className="form-group">
                  <label htmlFor="code">Code</label>
                  <Field type="text" name="code" className="form-control" />
                  <ErrorMessage
                    name="code"
                    component="div"
                    className="text-danger"
                  />
                </fieldset>

                <fieldset className="form-group">
                  <label htmlFor="name">Name</label>
                  <Field type="text" name="name" className="form-control" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </fieldset>
              </div>

              <div className="row">
                <fieldset className="form-group">
                  <label htmlFor="available_quantity">Available Quantity</label>
                  <Field
                    type="number"
                    name="available_quantity"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="available_quantity"
                    component="div"
                    className="text-danger"
                  />
                </fieldset>

                <fieldset className="form-group">
                  <label htmlFor="estimate_quantity">Estimate Quantity</label>
                  <Field
                    type="number"
                    name="estimate_quantity"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="estimate_quantity"
                    component="div"
                    className="text-danger"
                  />
                </fieldset>
              </div>

              <div className="row">
                <fieldset className="form-group">
                  <label htmlFor="max_estimate_quantity">
                    Max Estimate Quantity
                  </label>
                  <Field
                    type="number"
                    name="max_estimate_quantity"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="max_estimate_quantity"
                    component="div"
                    className="text-danger"
                  />
                </fieldset>

                <fieldset className="form-group">
                  <label htmlFor="unit_type">Unit Type</label>
                  <Field
                    type="text"
                    name="unit_type"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="unit_type"
                    component="div"
                    className="text-danger"
                  />
                </fieldset>
              </div>

              <div className="row">
                <fieldset className="form-group">
                  <label htmlFor="unit_cost_price">Unit Cost Price</label>
                  <Field
                    type="number"
                    name="unit_cost_price"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="unit_cost_price"
                    component="div"
                    className="text-danger"
                  />
                </fieldset>
              </div>

              <div className="row">
                <fieldset className="form-group">
                  <label htmlFor="description">Description</label>
                  <Field
                    as="textarea"
                    type="text"
                    name="description"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="description"
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
    );
  }
}

class CombinationComponent extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { parent, onSubmit } = this.props;
    return (
      <div className="combination form">
        {parent.state.menu}
        <Formik
          validationSchema={insertSchema}
          initialValues={{
            code: "",
            name: "",
            available_quantity: 0,
            estimate_quantity: 0,
            max_estimate_quantity: 0,
            unit_type: "",
            unit_cost_price: 0,
            description: "",
            image_url: "",
          }}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {(props) => (
            <Form>
              <div className="row">
                <fieldset className="form-group">
                  <label htmlFor="code">Code</label>
                  <Field type="text" name="code" className="form-control" />
                  <ErrorMessage
                    name="code"
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
    );
  }
}

class ItemInsertModalComponent extends Component {
  constructor() {
    super();
    this.state = {
      isShow: false,
      itemData: {},
      itemCombinationData: [],
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
    const { isShow, itemData, itemCombinationData, menu } = this.state;
    const { onSubmit } = this.props;
    return (
      <Modal
        show={isShow}
        onHide={this.handleShow}
        centered
        className="component item-insert-modal"
      >
        <Modal.Header closeButton className="header">
          <Modal.Title>Item Insert</Modal.Title>
        </Modal.Header>

        <Nav variant="tabs" onSelect={this.handleSelectMenu}>
          <Nav.Item>
            <Nav.Link eventKey="main">Main</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="combination" disabled>
              Combination
            </Nav.Link>
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
              combination: (
                <CombinationComponent
                  parent={this}
                  ref={(ref) => {
                    this.refCombinationComponent = ref;
                  }}
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
            Insert Item
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ItemInsertModalComponent;
