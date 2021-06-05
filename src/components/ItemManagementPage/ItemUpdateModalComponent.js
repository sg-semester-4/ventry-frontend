import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";

import ItemCardImage from "../../assets/images/item-management-card-img.svg";
import "./Styles/ItemUpdateModalStyle.css";

const updateSchema = Yup.object().shape({
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

export default class FooterComponent extends Component {
  constructor() {
    super();
    this.state = {
      isShow: false,
      itemData: {
        code: "",
        name: "",
        available_quantity: 0,
        estimate_quantity: 0,
        max_estimate_quantity: 0,
        unit_type: "",
        unit_cost_price: 0,
        description: "",
        image_url: "",
      },
    };
  }

  handleShow = () => {
    const { isShow } = this.state;
    this.setState({ isShow: !isShow });
  };

  render() {
    const { isShow, itemData } = this.state;
    const { onSubmit } = this.props;
    return (
      <Modal
        show={isShow}
        onHide={this.handleShow}
        centered
        className="component item-update-modal"
      >
        <Modal.Header closeButton className="header">
          <Modal.Title>Item Update</Modal.Title>
        </Modal.Header>
        <Modal.Body className="body">
          <div className="form">
            <Formik
              validationSchema={updateSchema}
              initialValues={itemData}
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
                      <label htmlFor="available_quantity">
                        Available Quantity
                      </label>
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
                      <label htmlFor="estimate_quantity">
                        Estimate Quantity
                      </label>
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
                    Update Item
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </Modal.Body>

        <Modal.Footer className="footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.refFormSubmitButton.click()}
          >
            Update Item
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}
