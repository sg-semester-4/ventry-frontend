import React, { Component } from "react";
import { Modal, Nav } from "react-bootstrap";

import ProductCardImage from "../../assets/images/product-management-card-img.svg";
import "./Styles/ProductTransactionViewModalStyle.css";

class MainComponent extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { parent } = this.props;
    const { data } = parent.props.parent.state.viewProductTransactionResponse;
    return (
      <div className="main">
        <div className="id">
          <div className="text">{`ID: ${data.id}`}</div>
        </div>
        <div className="code">
          <div className="text">{`Code: ${data.product.code}`}</div>
        </div>
        <div className="name">
          <div className="text">{`Name: ${data.product.name}`}</div>
        </div>
        <div className="transaction-quantity">
          <div className="text">
            {`Transaction Quantity: ${parseFloat(data.quantity)}`}
          </div>
        </div>
        <div className="unit-type">
          <div className="text">{`Unit Type: ${data.product.unit_type}`}</div>
        </div>
        <div className="unit-cost-price">
          <div className="text">
            {`Unit Cost Price: ${parseFloat(data.product.unit_cost_price)}`}
          </div>
        </div>
        <div className="unit-sell-price">
          <div className="text">
            {`Unit Sell Price: ${parseFloat(data.product.unit_sell_price)}`}
          </div>
        </div>
        <div className="total-sell-price">
          <div className="text">
            {`Total Sell Price: ${parseFloat(data.total_sell_price)}`}
          </div>
        </div>
        <div className="updated-at">
          <div className="text">{`Updated At: ${data.updated_at}`}</div>
        </div>
        <div className="created-at">
          <div className="text">{`Created At: ${data.created_at}`}</div>
        </div>
        <div className="image">
          Image:{" "}
          <img
            src={data.product.image_url || ProductCardImage}
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

class ProductTransactionViewModalComponent extends Component {
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
          <Modal.Title>Product Transaction Details</Modal.Title>
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
            Update Transaction
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onDelete()}
          >
            Delete Transaction
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ProductTransactionViewModalComponent;
