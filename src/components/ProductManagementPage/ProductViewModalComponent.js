import React, { Component } from "react";
import { Modal, Nav } from "react-bootstrap";

import ProductCardImage from "../../assets/images/product-management-card-img.svg";
import "./Styles/ProductViewModalStyle.css";

class MainComponent extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { parent } = this.props;
    const { data } = parent.props.parent.state.viewProductResponse;
    return (
      <div className="main">
        <div className="id">
          <div className="text">{`ID: ${data.id}`}</div>
        </div>
        <div className="code">
          <div className="text">{`Code: ${data.code}`}</div>
        </div>
        <div className="name">
          <div className="text">{`Name: ${data.name}`}</div>
        </div>
        <div className="available-quantity">
          <div className="text">
            {`Available Quantity: ${parseFloat(data.available_quantity)}`}
          </div>
        </div>
        <div className="estimate-quantity">
          <div className="text">
            {`Estimate Quantity: ${parseFloat(data.estimate_quantity)}`}
          </div>
        </div>
        <div className="unit-type">
          <div className="text">{`Unit Type: ${data.unit_type}`}</div>
        </div>
        <div className="unit-cost-price">
          <div className="text">
            {`Unit Cost Price: ${parseFloat(data.unit_cost_price)}`}
          </div>
        </div>
        <div className="unit-sell-price">
          <div className="text">
            {`Unit Sell Price: ${parseFloat(data.unit_sell_price)}`}
          </div>
        </div>
        <div className="description">
          <div className="text">{`Description: ${data.description}`}</div>
        </div>
        <div className="image">
          Image:{" "}
          <img
            src={data.image_url || ProductCardImage}
            onError={(e) => {
              e.target.src = ProductCardImage;
            }}
            alt="product"
          />
        </div>
      </div>
    );
  }
}

class ItemComponent extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { quantity } = this.state;
    const { parent } = this.props;
    const {
      allProductItemResponse,
      viewProductResponse,
    } = parent.props.parent.state;
    return (
      <div className="item">
        <div className="table-ic">
          <table className="table ">
            <thead>
              <tr>
                <th scope="col">Product Item ID</th>
                <th scope="col">Code</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {allProductItemResponse.data
                .filter((itm) => itm.product_id === viewProductResponse.data.id)
                .map((val, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{val.item_id}</td>
                      <td>{val.item.code}</td>
                      <td>{val.item.name}</td>
                      <td>{val.quantity}</td>
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

class ProductViewModalComponent extends Component {
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
    const { onUpdate, onDelete, parent } = this.props;
    return (
      <Modal
        show={isShow}
        onHide={this.handleShow}
        centered
        className="component product-view-modal"
      >
        <Modal.Header closeButton className="header">
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>

        <Nav variant="tabs" onSelect={this.handleSelectMenu}>
          <Nav.Item>
            <Nav.Link eventKey="main">Main</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="item">Item</Nav.Link>
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
                />
              ),
              item: (
                <ItemComponent
                  parent={this}
                  ref={(ref) => {
                    this.refItemComponent = ref;
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
            onClick={() => onUpdate()}
          >
            Update Product
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onDelete()}
          >
            Delete Product
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ProductViewModalComponent;
