import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Modal, Nav } from "react-bootstrap";
import * as Yup from "yup";

import MessageModalComponent from "../MessageModalComponent";

import ItemCombinationsAPI from "../../apis/ItemCombinationsAPI";

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

class MainComponent extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { onSubmit, parent } = this.props;
    return (
      <div className="main">
        <div className="form">
          <Formik
            validationSchema={updateSchema}
            initialValues={parent.props.parent.state.viewItemResponse.data}
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
                  Update Item
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

class CombinationComponent extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 0,
    };
  }

  handleClickInsert = (val) => {
    const { quantity } = this.state;
    const { parent } = this.props;
    const { viewItemResponse } = parent.props.parent.state;

    const newItemCombination = {
      parent_item_id: viewItemResponse.data.id,
      child_item_id: val.id,
      quantity: parseFloat(quantity),
    };

    ItemCombinationsAPI.createOne(newItemCombination)
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          parent.setState({
            insertItemCombinationResponse: { status, message, data },
          });
        } else {
          parent.props.parent.refMessageModalComponent.setState({
            title: "Status",
            content: message,
          });
          parent.props.parent.refMessageModalComponent.handleShow();
        }
      })
      .catch((err) => {
        console.log(err);
        parent.props.parent.refMessageModalComponent.setState({
          title: "Status",
          content: "Error has occurred",
        });
        parent.props.parent.refMessageModalComponent.handleShow();
      })
      .finally(async () => {
        parent.props.parent.handleFetchOneItem(viewItemResponse.data.id);
        await parent.props.parent.handleFetchAllItem();
        await parent.props.parent.handleFetchAllItemCombination();
      });
  };

  handleChangeInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClickDelete = (val) => {
    const { parent } = this.props;
    const { viewItemResponse } = parent.props.parent.state;

    ItemCombinationsAPI.deleteOneByID(val.id)
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          parent.setState({
            deleteItemCombinationResponse: { status, message, data },
          });
        } else {
          parent.props.parent.refMessageModalComponent.setState({
            title: "Status",
            content: message,
          });
          parent.props.parent.refMessageModalComponent.handleShow();
        }
      })
      .catch((err) => {
        console.log(err);
        parent.props.parent.refMessageModalComponent.setState({
          title: "Status",
          content: "Error has occurred",
        });
        parent.props.parent.refMessageModalComponent.handleShow();
      })
      .finally(async () => {
        parent.props.parent.handleFetchOneItem(viewItemResponse.data.id);
        await parent.props.parent.handleFetchAllItem();
        await parent.props.parent.handleFetchAllItemCombination();
      });
  };

  render() {
    const { quantity } = this.state;
    const { parent } = this.props;
    const {
      allItemCombinationResponse,
      allItemResponse,
      viewItemResponse,
    } = parent.props.parent.state;
    return (
      <div className="combination">
        <div className="input-quantity">
          <fieldset className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              className="form-control"
              name="quantity"
              type="number"
              onChange={this.handleChangeInput}
              value={quantity}
            />
          </fieldset>
        </div>
        <div className="table-i">
          <table className="table ">
            <thead>
              <tr>
                <th scope="col">Item ID</th>
                <th scope="col">Code</th>
                <th scope="col">Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {allItemResponse.data.map((val, idx) => {
                return (
                  <tr key={idx}>
                    <td>{val.id}</td>
                    <td>{val.code}</td>
                    <td>{val.name}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => this.handleClickInsert(val)}
                      >
                        Insert
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="table-ic">
          <table className="table ">
            <thead>
              <tr>
                <th scope="col">Child Item ID</th>
                <th scope="col">Code</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {allItemCombinationResponse.data
                .filter(
                  (itm) => itm.parent_item_id === viewItemResponse.data.id
                )
                .map((val, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{val.child_item_id}</td>
                      <td>{val.child_item.code}</td>
                      <td>{val.child_item.name}</td>
                      <td>{val.quantity}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => this.handleClickDelete(val)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

class ItemUpdateModalComponent extends Component {
  constructor() {
    super();
    this.state = {
      isShow: false,
      menu: "main",
      insertItemCombinationResponse: {},
      deleteItemCombinationResponse: {},
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
        className="component item-update-modal"
      >
        <Modal.Header closeButton className="header">
          <Modal.Title>Item Update</Modal.Title>
        </Modal.Header>

        <Nav variant="tabs" onSelect={this.handleSelectMenu}>
          <Nav.Item>
            <Nav.Link eventKey="main">Main</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="combination">Combination</Nav.Link>
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
            Update Item
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ItemUpdateModalComponent;
