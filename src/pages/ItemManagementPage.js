import React, { Component } from "react";
import "./Styles/ItemManagementStyle.css";

import ItemsAPI from "../apis/ItemsAPI";
import ItemCombinationsAPI from "../apis/ItemCombinationsAPI";
import InventoryControlsAPI from "../apis/InventoryControlsAPI";

import AuthSessionService from "../services/AuthSessionService";

import ItemViewModalComponent from "../components/ItemManagementPage/ItemViewModalComponent";
import ItemInsertModalComponent from "../components/ItemManagementPage/ItemInsertModalComponent";
import ItemUpdateModalComponent from "../components/ItemManagementPage/ItemUpdateModalComponent";
import MessageModalComponent from "../components/MessageModalComponent";

import ButtonPlusImage from "../assets/images/control-button-plus-img.svg";
import ItemCardImage from "../assets/images/item-management-card-img.svg";

class ItemManagementPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allItemCombinationResponse: {
        statusMessage: "",
        statusCode: 0,
        data: [],
      },
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

  async componentDidMount() {
    await this.handleFetchAllItem();
    await this.handleFetchAllItemCombination();
    // setInterval(() => {
    //   this.handleFetchAllItem();
    // }, 2000);
  }

  handleFetchAllItemCombination = () => {
    const { allItemResponse } = this.state;

    return ItemCombinationsAPI.readAll()
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        const newItemCombinationData = data.map((val, idx) => {
          return {
            ...val,
            parent_item: allItemResponse.data.find(
              (itm) => itm.id === val.parent_item_id
            ),
            child_item: allItemResponse.data.find(
              (itm) => itm.id === val.child_item_id
            ),
          };
        });

        if (status === 200) {
          this.setState({
            allItemCombinationResponse: {
              status,
              message,
              data: newItemCombinationData,
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

  handleFetchOneItem = (ID) => {
    return ItemsAPI.readOneByID(ID)
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({
            viewItemResponse: {
              status,
              message,
              data: {
                ...data,
                available_quantity: parseFloat(data.available_quantity),
                estimate_quantity: parseFloat(data.estimate_quantity),
                max_estimate_quantity: parseFloat(data.max_estimate_quantity),
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
    ItemsAPI.readOneByID(ID)
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({
            viewItemResponse: {
              status,
              message,
              data: {
                ...data,
                available_quantity: parseFloat(data.available_quantity),
                estimate_quantity: parseFloat(data.estimate_quantity),
                max_estimate_quantity: parseFloat(data.max_estimate_quantity),
              },
            },
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
      .finally(async () => {
        await this.handleFetchAllItem();
        await this.handleFetchAllItemCombination();
      });
  };

  handleModalInsert = () => {
    this.refItemInsertModalComponent.handleShow();
  };

  handleModalInsertOnSubmit = (values, actions) => {
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
        await this.handleFetchAllItemCombination();
      });
  };

  handleModalUpdate = () => {
    this.refItemViewModalComponent.handleShow();
    this.refItemUpdateModalComponent.handleShow();
  };

  handleModalUpdateOnSubmit = (values, actions) => {
    const { viewItemResponse } = this.state;
    ItemsAPI.updateOneByID(viewItemResponse.data.id, values)
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({
            updateItemResponse: { status, message, data },
          });

          if (values.is_record === true) {
            InventoryControlsAPI.createOne({
              account_id: values.account_id,
              item_id: values.id,
              quantity:
                values.available_quantity -
                viewItemResponse.data.available_quantity,
            })
              .then((res2) => {
                console.log(res2);
                if (res2.data.status === 200) {
                  //
                } else {
                  this.refMessageModalComponent.setState({
                    title: "Status",
                    content: message,
                  });
                  this.refMessageModalComponent.handleShow();
                }
              })
              .catch((err2) => {
                console.log(err2);
                this.refMessageModalComponent.setState({
                  title: "Status",
                  content: "Error has occurred",
                });
                this.refMessageModalComponent.handleShow();
              });
          }

          this.refItemUpdateModalComponent.handleShow();
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
        await this.handleFetchAllItemCombination();
      });
  };

  handleModalDelete = () => {
    const { viewItemResponse } = this.state;
    ItemsAPI.deleteOneByID(viewItemResponse.data.id)
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({ deleteItemResponse: { status, message, data } });
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
        this.refItemViewModalComponent.handleShow();
        await this.handleFetchAllItem();
        await this.handleFetchAllItemCombination();
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
          parent={this}
          ref={(ref) => {
            this.refItemViewModalComponent = ref;
          }}
          onUpdate={this.handleModalUpdate}
          onDelete={this.handleModalDelete}
        />

        <ItemInsertModalComponent
          parent={this}
          ref={(ref) => {
            this.refItemInsertModalComponent = ref;
          }}
          onSubmit={this.handleModalInsertOnSubmit}
        />

        <ItemUpdateModalComponent
          parent={this}
          ref={(ref) => {
            this.refItemUpdateModalComponent = ref;
          }}
          onSubmit={this.handleModalUpdateOnSubmit}
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
