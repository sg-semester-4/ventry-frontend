import React, { Component } from "react";
import "./Styles/ProductManagementStyle.css";

import ItemsAPI from "../apis/ItemsAPI";
import ProductsAPI from "../apis/ProductsAPI";
import ProductItemsAPI from "../apis/ProductItemsAPI";

import AuthSessionService from "../services/AuthSessionService";

import ProductViewModalComponent from "../components/ProductManagementPage/ProductViewModalComponent";
import ProductInsertModalComponent from "../components/ProductManagementPage/ProductInsertModalComponent";
import ProductUpdateModalComponent from "../components/ProductManagementPage/ProductUpdateModalComponent";
import MessageModalComponent from "../components/MessageModalComponent";

import ButtonPlusImage from "../assets/images/control-button-plus-img.svg";
import ProductCardImage from "../assets/images/product-management-card-img.svg";

class ProductManagementPage extends Component {
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
      viewProductResponse: {
        statusMessage: "",
        statusCode: 0,
        data: {},
      },
      insertProductResponse: {
        statusMessage: "",
        statusCode: 0,
        data: {},
      },
      updateProductResponse: {
        statusMessage: "",
        statusCode: 0,
        data: {},
      },
      deleteProductResponse: {
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
    // setInterval(() => {
    //   this.handleFetchAllItem();
    // }, 2000);
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

  handleFetchOneProduct = (ID) => {
    return ProductsAPI.readOneByID(ID)
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({
            viewProductResponse: {
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
    ProductsAPI.readOneByID(ID)
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({
            viewProductResponse: {
              status,
              message,
              data: {
                ...data,
                available_quantity: parseFloat(data.available_quantity),
                estimate_quantity: parseFloat(data.estimate_quantity),
              },
            },
          });
          this.refProductViewModalComponent.handleShow();
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

  handleModalInsert = () => {
    this.refProductInsertModalComponent.handleShow();
  };

  handleModalInsertOnSubmit = (values, actions) => {
    const account = AuthSessionService.getAccount();
    ProductsAPI.createOne({ ...values, account_id: account.id })
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({ insertProductResponse: { status, message, data } });
          this.refProductInsertModalComponent.handleShow();
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
        await this.handleFetchAllProduct();
        await this.handleFetchAllProductItem();
      });
  };

  handleModalUpdate = () => {
    this.refProductViewModalComponent.handleShow();
    this.refProductUpdateModalComponent.handleShow();
  };

  handleModalUpdateOnSubmit = (values, actions) => {
    const { viewProductResponse } = this.state;
    ProductsAPI.updateOneByID(viewProductResponse.data.id, values)
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({
            updateProductResponse: { status, message, data },
          });

          // Should implement inventory control history when product quantity changed.

          this.refProductUpdateModalComponent.handleShow();
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
        await this.handleFetchAllProduct();
        await this.handleFetchAllProductItem();
      });
  };

  handleModalDelete = () => {
    const { viewProductResponse } = this.state;
    ProductsAPI.deleteOneByID(viewProductResponse.data.id)
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;

        if (status === 200) {
          this.setState({ deleteProductResponse: { status, message, data } });
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
        this.refProductViewModalComponent.handleShow();
        await this.handleFetchAllItem();
        await this.handleFetchAllProduct();
        await this.handleFetchAllProductItem();
      });
  };

  render() {
    const { allProductResponse } = this.state;
    return (
      <div className="page product-management">
        <MessageModalComponent
          ref={(ref) => {
            this.refMessageModalComponent = ref;
          }}
        />
        <ProductViewModalComponent
          parent={this}
          ref={(ref) => {
            this.refProductViewModalComponent = ref;
          }}
          onUpdate={this.handleModalUpdate}
          onDelete={this.handleModalDelete}
        />

        <ProductInsertModalComponent
          parent={this}
          ref={(ref) => {
            this.refProductInsertModalComponent = ref;
          }}
          onSubmit={this.handleModalInsertOnSubmit}
        />

        <ProductUpdateModalComponent
          parent={this}
          ref={(ref) => {
            this.refProductUpdateModalComponent = ref;
          }}
          onSubmit={this.handleModalUpdateOnSubmit}
        />

        <div className="header">
          <div className="left-section">
            <div className="title">
              <h1>Product Management</h1>
            </div>
            <div className="description">
              <div className="text">
                You can manage all of your products in here (view, insert,
                update, and delete product).
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
                Insert Product
              </button>
            </div>
          </div>
        </div>

        <div className="body">
          {allProductResponse.data.length <= 0 ? (
            <div className="empty-data">
              <div className="text">
                Your products is empty, try to insert one!
              </div>
            </div>
          ) : null}
          {allProductResponse.data.map((val, idx) => (
            <div key={val.id} className="card">
              <div className="image">
                <img
                  src={val.image_url || ProductCardImage}
                  onError={(e) => {
                    e.target.src = ProductCardImage;
                  }}
                  alt="product"
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

export default ProductManagementPage;
