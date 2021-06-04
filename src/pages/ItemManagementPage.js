import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Styles/ItemManagementStyle.css";

import ItemsAPI from "../apis/ItemsAPI";
import AuthSessionService from "../services/AuthSessionService";
import ItemViewModalComponent from "../components/ItemManagementPage/ItemViewModalComponent";
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
      oneItemResponse: {
        statusMessage: "",
        statusCode: 0,
        data: {},
      },
    };
  }

  componentDidMount = () => {
    this.handleFetchAllItem();
    // setInterval(() => {
    //   this.handleFetch();
    // }, 1000);
  };

  handleFetchAllItem = () => {
    const account = AuthSessionService.getAccount();

    ItemsAPI.readAll()
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({ allItemResponse: { status, message, data } });
        }
      })
      .catch((err) => {
        console.log(err);
        this.messageModalComponent.setState({
          title: "Status",
          content: "Error has occurred",
        });
        this.messageModalComponent.handleShow();
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
          this.setState({ oneItemResponse: { status, message, data } });
          this.itemViewModalComponent.setState({
            itemData: data,
          });
          this.itemViewModalComponent.handleShow();
        } else {
          this.messageModalComponent.setState({
            title: "Status",
            content: message,
          });
          this.messageModalComponent.handleShow();
        }
      })
      .catch((err) => {
        console.log(err);
        this.messageModalComponent.setState({
          title: "Status",
          content: "Error has occurred",
        });
        this.messageModalComponent.handleShow();
      })
      .finally(() => {});
  };

  handleModalInsert = () => {
    this.itemViewModalComponent.handleShow();
  };

  handleModalUpdate = () => {
    this.itemViewModalComponent.handleShow();
  };

  handleModalDelete = () => {
    this.itemViewModalComponent.handleShow();
  };

  render() {
    const { allItemResponse } = this.state;
    return (
      <div className="page item-management">
        <MessageModalComponent
          ref={(ref) => {
            this.messageModalComponent = ref;
          }}
        />
        <ItemViewModalComponent
          ref={(ref) => {
            this.itemViewModalComponent = ref;
          }}
          onUpdate={this.handleModalUpdate}
          onDelete={this.handleModalDelete}
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
          {allItemResponse.data.map((val, idx) => (
            <div key={val.id} className="card">
              <div className="image">
                <img src={ItemCardImage} alt="item" />
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
