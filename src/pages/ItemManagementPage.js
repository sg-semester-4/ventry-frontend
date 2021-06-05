import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Styles/ItemManagementStyle.css";

import ItemsAPI from "../apis/ItemsAPI";
import AuthSessionService from "../services/AuthSessionService";
import ItemViewModalComponent from "../components/ItemManagementPage/ItemViewModalComponent";
import ItemInsertModalComponent from "../components/ItemManagementPage/ItemInsertModalComponent";
import MessageModalComponent from "../components/MessageModalComponent";

import ButtonPlusImage from "../assets/images/control-button-plus-img.svg";
import ItemCardImage from "../assets/images/item-management-card-img.svg";

class ItemManagementPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allItemResponse: {
        statusMessage: "",
        statusCode: 0,
        data: [],
      },
      viewItemResponse: {
        statusMessage: "",
        statusCode: 0,
        data: {},
      },
      insertItemResponse: {
        statusMessage: "",
        statusCode: 0,
        data: {},
      },
      updateItemResponse: {
        statusMessage: "",
        statusCode: 0,
        data: {},
      },
      deleteItemResponse: {
        statusMessage: "",
        statusCode: 0,
        data: {},
      },
    };
  }

  componentDidMount = () => {
    this.handleFetchAllItem();
    // setInterval(() => {
    //   this.handleFetchAllItem();
    // }, 2000);
  };

  handleFetchAllItem = () => {
    const account = AuthSessionService.getAccount();

    ItemsAPI.readAll()
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({
            allItemResponse: {
              status,
              message,
              data: data.filter((val, idx) => val.account_id === account.id),
            },
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

  handleModalView = (ID) => {
    const account = AuthSessionService.getAccount();

    ItemsAPI.readOneByID(ID)
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({ viewItemResponse: { status, message, data } });
          this.refItemViewModalComponent.setState({
            itemData: data,
          });
          this.refItemViewModalComponent.handleShow();
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

  handleModalInsert = () => {
    this.refItemInsertModalComponent.handleShow();
  };

  handleModalInsertOnSubmit = (values, actions) => {
    console.log(values);
    const account = AuthSessionService.getAccount();
    ItemsAPI.createOne({ ...values, account_id: account.id })
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({ insertItemResponse: { status, message, data } });
          this.refItemInsertModalComponent.setState({
            itemData: data,
          });
          this.refItemInsertModalComponent.handleShow();
          this.handleFetchAllItem();
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
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  handleModalUpdate = () => {
    this.refItemViewModalComponent.handleShow();
  };

  handleModalDelete = () => {
    const { viewItemResponse } = this.state;
    ItemsAPI.deleteOneByID(viewItemResponse.data.id)
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({ deleteItemResponse: { status, message, data } });
          this.handleFetchAllItem();
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
      .finally(() => {
        this.refItemViewModalComponent.handleShow();
      });
  };

  render() {
    const { allItemResponse } = this.state;
    return (
      <div className="page item-management">
        <MessageModalComponent
          ref={(ref) => {
            this.refMessageModalComponent = ref;
          }}
        />
        <ItemViewModalComponent
          ref={(ref) => {
            this.refItemViewModalComponent = ref;
          }}
          onUpdate={this.handleModalUpdate}
          onDelete={this.handleModalDelete}
        />

        <ItemInsertModalComponent
          ref={(ref) => {
            this.refItemInsertModalComponent = ref;
          }}
          onSubmit={this.handleModalInsertOnSubmit}
        />

        <div className="header">
          <div className="left-section">
            <div className="title">
              <h1>Item Management</h1>
            </div>
            <div className="description">
              <div className="text">
                You can manage all of your items in here (view, insert, update,
                and delete item).
              </div>
            </div>
          </div>
          <div className="right-section">
            <div className="control">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.handleModalInsert()}
              >
                <img src={ButtonPlusImage} alt="plus" />
                Insert Item
              </button>
            </div>
          </div>
        </div>

        <div className="body">
          {allItemResponse.data.length <= 0 ? (
            <div className="empty-data">
              <div className="text">
                Your items is empty, try to insert one!
              </div>
            </div>
          ) : null}
          {allItemResponse.data.map((val, idx) => (
            <div key={val.id} className="card">
              <div className="image">
                <img
                  src={val.image_url || ItemCardImage}
                  onError={(e) => {
                    e.target.src = ItemCardImage;
                  }}
                  alt="item"
                />
              </div>
              <div className="content">
                <div className="code">
                  <div className="text">Code: {val.code}</div>
                </div>
                <div className="name">
                  <div className="text">Name: {val.name}</div>
                </div>
                <div className="quantity">
                  <div className="text">Quantity: {val.available_quantity}</div>
                </div>
                <div className="control">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => this.handleModalView(val.id)}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ItemManagementPage;
