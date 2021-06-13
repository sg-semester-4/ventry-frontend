import React, { Component } from "react";
import "./Styles/ItemForecastStyle.css";

import ItemsAPI from "../apis/ItemsAPI";
import ProductsAPI from "../apis/ProductsAPI";
import ProductItemsAPI from "../apis/ProductItemsAPI";

import AuthSessionService from "../services/AuthSessionService";

import ItemViewModalComponent from "../components/ItemForecastPage/ItemViewModalComponent";
import MessageModalComponent from "../components/MessageModalComponent";

import ButtonPlusImage from "../assets/images/control-button-plus-img.svg";
import ItemCardImage from "../assets/images/item-management-card-img.svg";

class ItemForecastPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProductItemResponse: {
        statusMessage: "",
        statusCode: 0,
        data: [],
      },
      allItemResponse: {
        statusMessage: "",
        statusCode: 0,
        data: [],
      },
      allProductResponse: {
        statusMessage: "",
        statusCode: 0,
        data: [],
      },
      viewItemResponse: {
        statusMessage: "",
        statusCode: 0,
        data: {},
      },
    };
  }

  async componentDidMount() {
    await this.handleFetchAllItem();
    await this.handleFetchAllProduct();
    await this.handleFetchAllProductItem();
  }

  handleFetchAllProductItem = () => {
    const { allProductResponse, allItemResponse } = this.state;

    return ProductItemsAPI.readAll()
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        const newProductItemData = data.map((val, idx) => {
          return {
            ...val,
            product: allProductResponse.data.find(
              (itm) => itm.id === val.product_id
            ),
            item: allItemResponse.data.find((itm) => itm.id === val.item_id),
          };
        });

        if (status === 200) {
          this.setState({
            allProductItemResponse: {
              status,
              message,
              data: newProductItemData,
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

  handleFetchAllProduct = () => {
    const account = AuthSessionService.getAccount();

    return ProductsAPI.readAll()
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({
            allProductResponse: {
              status,
              message,
              // data,
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
    this.refItemViewModalComponent.setState({
      observedData: [],
      forecastedData: [],
      forecastResponse: {},
    });

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
        await this.handleFetchAllProduct();
        await this.handleFetchAllProductItem();
      });
  };

  render() {
    const { allItemResponse } = this.state;
    return (
      <div className="page item-forecast">
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
        />

        <div className="header">
          <div className="left-section">
            <div className="title">
              <h1>Item Forecast</h1>
            </div>
            <div className="description">
              <div className="text">
                You can see a forecasting graph detail of your item here.
              </div>
            </div>
          </div>
          <div className="right-section d-none">
            <div className="control">
              <button type="button" className="btn btn-primary">
                <img src={ButtonPlusImage} alt="plus" />
                Action
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

export default ItemForecastPage;
