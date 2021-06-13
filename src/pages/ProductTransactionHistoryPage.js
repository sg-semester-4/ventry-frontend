import React, { Component } from "react";
import "./Styles/ProductTransactionHistoryStyle.css";

import ProductsAPI from "../apis/ProductsAPI";
import ProductTransactionsAPI from "../apis/ProductTransactionsAPI";

import AuthSessionService from "../services/AuthSessionService";

import ProductTransactionViewModalComponent from "../components/ProductTransactionHistoryPage/ProductTransactionViewModalComponent";
import ProductTransactionInsertModalComponent from "../components/ProductTransactionHistoryPage/ProductTransactionInsertModalComponent";
import ProductTransactionUpdateModalComponent from "../components/ProductTransactionHistoryPage/ProductTransactionUpdateModalComponent";
import MessageModalComponent from "../components/MessageModalComponent";

import ButtonPlusImage from "../assets/images/control-button-plus-img.svg";
import ProductCardImage from "../assets/images/product-management-card-img.svg";

class ProductTransactionHistoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProductTransactionResponse: {
        statusMessage: "",
        statusCode: 0,
        data: [],
      },
      allProductResponse: {
        statusMessage: "",
        statusCode: 0,
        data: [],
      },
      viewProductTransactionResponse: {
        statusMessage: "",
        statusCode: 0,
        data: {},
      },
      insertProductTransactionResponse: {
        statusMessage: "",
        statusCode: 0,
        data: {},
      },
      updateProductTransactionResponse: {
        statusMessage: "",
        statusCode: 0,
        data: {},
      },
      deleteProductTransactionResponse: {
        statusMessage: "",
        statusCode: 0,
        data: {},
      },
    };
  }

  async componentDidMount() {
    await this.handleFetchAllProduct();
    await this.handleFetchAllProductTransaction();
    // setInterval(() => {
    // }, 2000);
  }

  handleFetchAllProductTransaction = () => {
    const { allProductResponse } = this.state;

    return ProductTransactionsAPI.readAll()
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        const newProductTransactionData = data
          .map((val, idx) => {
            return {
              ...val,
              product: allProductResponse.data.find(
                (itm) => itm.id === val.product_id
              ),
            };
          })
          .sort((a, b) => (b.updated_at > a.updated_at ? 1 : -1));

        if (status === 200) {
          this.setState({
            allProductTransactionResponse: {
              status,
              message,
              data: newProductTransactionData,
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

  handleFetchOneProductTransaction = (ID) => {
    const { allProductResponse } = this.state;
    return ProductTransactionsAPI.readOneByID(ID)
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({
            viewProductTransactionResponse: {
              status,
              message,
              data: {
                ...data,
                quantity: parseFloat(data.quantity),
                product: allProductResponse.data.find(
                  (itm) => itm.id === data.product_id
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
    const { allProductResponse } = this.state;
    ProductTransactionsAPI.readOneByID(ID)
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({
            viewProductTransactionResponse: {
              status,
              message,
              data: {
                ...data,
                quantity: parseFloat(data.quantity),
                product: allProductResponse.data.find(
                  (itm) => itm.id === data.product_id
                ),
              },
            },
          });
          this.refProductTransactionViewModalComponent.handleShow();
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
        await this.handleFetchAllProduct();
        await this.handleFetchAllProductTransaction();
      });
  };

  handleModalInsert = () => {
    this.refProductTransactionInsertModalComponent.handleShow();
  };

  handleModalInsertOnSubmit = (values, actions) => {
    const account = AuthSessionService.getAccount();
    ProductTransactionsAPI.createOne({
      ...values,
      account_id: account.id,
    })
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({
            insertProductTransactionResponse: { status, message, data },
          });
          this.refProductTransactionInsertModalComponent.handleShow();
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
        await this.handleFetchAllProduct();
        await this.handleFetchAllProductTransaction();
      });
  };

  handleModalUpdate = () => {
    this.refProductTransactionViewModalComponent.handleShow();
    this.refProductTransactionUpdateModalComponent.handleShow();
  };

  handleModalUpdateOnSubmit = (values, actions) => {
    const { viewProductTransactionResponse } = this.state;
    ProductTransactionsAPI.updateOneByID(
      viewProductTransactionResponse.data.id,
      values
    )
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({
            updateProductTransactionResponse: { status, message, data },
          });
          this.refProductTransactionUpdateModalComponent.handleShow();
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
        await this.handleFetchAllProduct();
        await this.handleFetchAllProductTransaction();
      });
  };

  handleModalDelete = () => {
    const { viewProductTransactionResponse } = this.state;
    ProductTransactionsAPI.deleteOneByID(viewProductTransactionResponse.data.id)
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({
            deleteProductTransactionResponse: { status, message, data },
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
        this.refProductTransactionViewModalComponent.handleShow();
        await this.handleFetchAllProduct();
        await this.handleFetchAllProductTransaction();
      });
  };

  render() {
    const { allProductTransactionResponse } = this.state;
    return (
      <div className="page product-transaction-history">
        <MessageModalComponent
          ref={(ref) => {
            this.refMessageModalComponent = ref;
          }}
        />
        <ProductTransactionViewModalComponent
          parent={this}
          ref={(ref) => {
            this.refProductTransactionViewModalComponent = ref;
          }}
          onUpdate={this.handleModalUpdate}
          onDelete={this.handleModalDelete}
        />

        <ProductTransactionInsertModalComponent
          parent={this}
          ref={(ref) => {
            this.refProductTransactionInsertModalComponent = ref;
          }}
          onSubmit={this.handleModalInsertOnSubmit}
        />

        <ProductTransactionUpdateModalComponent
          parent={this}
          ref={(ref) => {
            this.refProductTransactionUpdateModalComponent = ref;
          }}
          onSubmit={this.handleModalUpdateOnSubmit}
        />

        <div className="header">
          <div className="left-section">
            <div className="title">
              <h1>Product Transaction History</h1>
            </div>
            <div className="description">
              <div className="text">
                You can manage all of your product transactions in here (view,
                insert, update, and delete product transaction).
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
                Insert Transaction
              </button>
            </div>
          </div>
        </div>

        <div className="body">
          {allProductTransactionResponse.data.length <= 0 ? (
            <div className="empty-data">
              <div className="text">
                Your product transactions is empty, try to insert one!
              </div>
            </div>
          ) : null}
          {allProductTransactionResponse.data.map((val, idx) => (
            <div key={val.id} className="card">
              <div className="image">
                <img
                  src={val.product.image_url || ProductCardImage}
                  onError={(e) => {
                    e.target.src = ProductCardImage;
                  }}
                  alt="product"
                />
              </div>
              <div className="content">
                <div className="code">
                  <div className="text">Code: {val.product.code}</div>
                </div>
                <div className="name">
                  <div className="text">Name: {val.product.name}</div>
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

export default ProductTransactionHistoryPage;
