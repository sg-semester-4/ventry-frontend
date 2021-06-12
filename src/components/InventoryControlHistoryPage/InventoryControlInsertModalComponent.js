import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Modal, Nav } from "react-bootstrap";
import * as Yup from "yup";

import ItemCardImage from "../../assets/images/item-management-card-img.svg";
import "./Styles/InventoryControlInsertModalStyle.css";

const insertSchema = Yup.object().shape({
  item_id: Yup.string("Must be string").required("Required"),
  quantity: Yup.number("Must be number").required("Required"),
});

class MainComponent extends Component {
  constructor() {
    super();
    this.state = {
      selectItem: [],
    };
  }

  handleClickSelect = (val) => {
    this.setState({ selectItem: [val] });
  };

  handleClickDelete = (val) => {
    this.setState({ selectItem: [] });
  };

  render() {
    const { onSubmit, parent } = this.props;
    const { selectItem } = this.state;
    const { allItemResponse } = parent.props.parent.state;
    return (
      <div className="main ">
        <div className="form">
          <Formik
            validationSchema={insertSchema}
            initialValues={{
              item_id: selectItem[0] ? selectItem[0].id : "",
              quantity: 0,
              total_sell_price: 0,
            }}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {(props) => (
              <Form>
                <div className="column">
                  <div className="table-p">
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
                                  onClick={() => this.handleClickSelect(val)}
                                >
                                  Select
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="table-sp">
                    <table className="table ">
                      <thead>
                        <tr>
                          <th scope="col">Selected Item ID</th>
                          <th scope="col">Code</th>
                          <th scope="col">Name</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectItem.map((val, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{val.id}</td>
                              <td>{val.code}</td>
                              <td>{val.name}</td>
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
                  <ErrorMessage
                    name="item_id"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="row">
                  <fieldset className="form-group">
                    <label htmlFor="quantity">Control Quantity</label>
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

class InventoryControlInsertModalComponent extends Component {
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
            Insert Control
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default InventoryControlInsertModalComponent;
