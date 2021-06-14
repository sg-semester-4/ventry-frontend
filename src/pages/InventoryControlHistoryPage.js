import React, { Component } from "react";
import "./Styles/InventoryControlHistoryStyle.css";

import ItemsAPI from "../apis/ItemsAPI";
import InventoryControlsAPI from "../apis/InventoryControlsAPI";

import AuthSessionService from "../services/AuthSessionService";

import InventoryControlViewModalComponent from "../components/InventoryControlHistoryPage/InventoryControlViewModalComponent";
import InventoryControlInsertModalComponent from "../components/InventoryControlHistoryPage/InventoryControlInsertModalComponent";
import InventoryControlUpdateModalComponent from "../components/InventoryControlHistoryPage/InventoryControlUpdateModalComponent";
import MessageModalComponent from "../components/MessageModalComponent";

import ButtonPlusImage from "../assets/images/control-button-plus-img.svg";
import ItemCardImage from "../assets/images/item-management-card-img.svg";

class InventoryControlHistoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allInventoryControlResponse: {
        statusMessage: "",
        statusCode: 0,
        data: [],
      },
      allItemResponse: {
        statusMessage: "",
        statusCode: 0,
        data: [],
      },
      viewInventoryControlResponse: {
        statusMessage: "",
        statusCode: 0,
        data: {},
      },
      insertInventoryControlResponse: {
        statusMessage: "",
        statusCode: 0,
        data: {},
      },
      updateInventoryControlResponse: {
        statusMessage: "",
        statusCode: 0,
        data: {},
      },
      deleteInventoryControlResponse: {
        statusMessage: "",
        statusCode: 0,
        data: {},
      },
    };
  }

  async componentDidMount() {
    await this.handleFetchAllItem();
    await this.handleFetchAllInventoryControl();
    // setInterval(() => {
    // }, 2000);
  }

  handleFetchAllInventoryControl = () => {
    const { allItemResponse } = this.state;
    const account = AuthSessionService.getAccount();

    return InventoryControlsAPI.readAll()
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        const newInventoryControlData = data
          .filter((val, idx) => val.account_id === account.id)
          .map((val, idx) => {
            return {
              ...val,
              item: allItemResponse.data.find((itm) => itm.id === val.item_id),
            };
          })
          .sort((a, b) => (b.updated_at > a.updated_at ? 1 : -1));

        if (status === 200) {
          this.setState({
            allInventoryControlResponse: {
              status,
              message,
              data: newInventoryControlData,
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

  handleFetchAllItem = () => {
    const account = AuthSessionService.getAccount();

    return ItemsAPI.readAll()
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({
            allItemResponse: {
              status,
              message,
              // data,
              data: data
                .filter((val, idx) => val.account_id === account.id)
                .sort((a, b) => (b.code < a.code ? 1 : -1)),
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

  handleFetchOneInventoryControl = (ID) => {
    const { allItemResponse } = this.state;
    return InventoryControlsAPI.readOneByID(ID)
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({
            viewInventoryControlResponse: {
              status,
              message,
              data: {
                ...data,
                quantity: parseFloat(data.quantity),
                item: allItemResponse.data.find(
                  (itm) => itm.id === data.item_id
                ),
              },
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
    const { allItemResponse } = this.state;
    InventoryControlsAPI.readOneByID(ID)
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({
            viewInventoryControlResponse: {
              status,
              message,
              data: {
                ...data,
                quantity: parseFloat(data.quantity),
                item: allItemResponse.data.find(
                  (itm) => itm.id === data.item_id
                ),
              },
            },
          });
          this.refInventoryControlViewModalComponent.handleShow();
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
      .finally(async () => {
        await this.handleFetchAllItem();
        await this.handleFetchAllInventoryControl();
      });
  };

  handleModalInsert = () => {
    this.refInventoryControlInsertModalComponent.handleShow();
  };

  handleModalInsertOnSubmit = (values, actions) => {
    const account = AuthSessionService.getAccount();
    InventoryControlsAPI.createOne({
      ...values,
      account_id: account.id,
    })
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({
            insertInventoryControlResponse: { status, message, data },
          });
          this.refInventoryControlInsertModalComponent.handleShow();
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
      .finally(async () => {
        actions.setSubmitting(false);
        await this.handleFetchAllItem();
        await this.handleFetchAllInventoryControl();
      });
  };

  handleModalUpdate = () => {
    this.refInventoryControlViewModalComponent.handleShow();
    this.refInventoryControlUpdateModalComponent.handleShow();
  };

  handleModalUpdateOnSubmit = (values, actions) => {
    const { viewInventoryControlResponse } = this.state;
    InventoryControlsAPI.updateOneByID(
      viewInventoryControlResponse.data.id,
      values
    )
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({
            updateInventoryControlResponse: { status, message, data },
          });
          this.refInventoryControlUpdateModalComponent.handleShow();
          this.handleModalView(values.id);
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
      .finally(async () => {
        actions.setSubmitting(false);
        await this.handleFetchAllItem();
        await this.handleFetchAllInventoryControl();
      });
  };

  handleModalDelete = () => {
    const { viewInventoryControlResponse } = this.state;
    InventoryControlsAPI.deleteOneByID(viewInventoryControlResponse.data.id)
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({
            deleteInventoryControlResponse: { status, message, data },
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
      .finally(async () => {
        this.refInventoryControlViewModalComponent.handleShow();
        await this.handleFetchAllItem();
        await this.handleFetchAllInventoryControl();
      });
  };

  render() {
    const { allInventoryControlResponse } = this.state;
    return (
      <div className="page inventory-control-history">
        <MessageModalComponent
          ref={(ref) => {
            this.refMessageModalComponent = ref;
          }}
        />
        <InventoryControlViewModalComponent
          parent={this}
          ref={(ref) => {
            this.refInventoryControlViewModalComponent = ref;
          }}
          onUpdate={this.handleModalUpdate}
          onDelete={this.handleModalDelete}
        />

        <InventoryControlInsertModalComponent
          parent={this}
          ref={(ref) => {
            this.refInventoryControlInsertModalComponent = ref;
          }}
          onSubmit={this.handleModalInsertOnSubmit}
        />

        <InventoryControlUpdateModalComponent
          parent={this}
          ref={(ref) => {
            this.refInventoryControlUpdateModalComponent = ref;
          }}
          onSubmit={this.handleModalUpdateOnSubmit}
        />

        <div className="header">
          <div className="left-section">
            <div className="title">
              <h1>Inventory Control History</h1>
            </div>
            <div className="description">
              <div className="text">
                You can manage all of your inventory controls in here (view,
                insert, update, and delete inventory control).
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
                Insert Control
              </button>
            </div>
          </div>
        </div>

        <div className="body">
          {allInventoryControlResponse.data.length <= 0 ? (
            <div className="empty-data">
              <div className="text">
                Your inventory controls is empty, try to insert one!
              </div>
            </div>
          ) : null}
          {allInventoryControlResponse.data.map((val, idx) => (
            <div key={val.id} className="card">
              <div className="image">
                <img
                  src={val.item.image_url || ItemCardImage}
                  onError={(e) => {
                    e.target.src = ItemCardImage;
                  }}
                  alt="item"
                />
              </div>
              <div className="content">
                <div className="code">
                  <div className="text">Code: {val.item.code}</div>
                </div>
                <div className="name">
                  <div className="text">Name: {val.item.name}</div>
                </div>
                <div className="quantity">
                  <div className="text">Quantity: {val.quantity}</div>
                </div>
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
          ))}
        </div>
      </div>
    );
  }
}

export default InventoryControlHistoryPage;
