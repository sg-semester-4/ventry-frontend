import React, { Component } from "react";
import { Modal } from "react-bootstrap";

import ItemCardImage from "../../assets/images/item-management-card-img.svg";
import "./Styles/ItemViewModalStyle.css";

export default class FooterComponent extends Component {
  constructor() {
    super();
    this.state = {
      isShow: false,
      itemData: {},
    };
  }

  handleShow = () => {
    const { isShow } = this.state;
    this.setState({ isShow: !isShow });
  };

  render() {
    const { isShow, itemData } = this.state;
    const { onUpdate, onDelete } = this.props;
    return (
      <Modal
        show={isShow}
        onHide={this.handleShow}
        centered
        className="component item-view-modal"
      >
        <Modal.Header closeButton className="header">
          <Modal.Title>Item Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="body">
          <div className="id">
            <div className="text">{`ID: ${itemData.id}`}</div>
          </div>
          <div className="code">
            <div className="text">{`Code: ${itemData.code}`}</div>
          </div>
          <div className="name">
            <div className="text">{`Name: ${itemData.name}`}</div>
          </div>
          <div className="available-quantity">
            <div className="text">
              {`Available Quantity: ${parseFloat(itemData.available_quantity)}`}
            </div>
          </div>
          <div className="estimate-quantity">
            <div className="text">
              {`Estimate Quantity: ${parseFloat(itemData.estimate_quantity)}`}
            </div>
          </div>
          <div className="max-estimate-quantity">
            <div className="text">
              {`Max Estimate Quantity: ${parseFloat(
                itemData.max_estimate_quantity
              )}`}
            </div>
          </div>
          <div className="unit-type">
            <div className="text">{`Unit Type: ${itemData.unit_type}`}</div>
          </div>
          <div className="unit-cost-price">
            <div className="text">
              {`Unit Cost Price: ${parseFloat(itemData.unit_cost_price)}`}
            </div>
          </div>
          <div className="description">
            <div className="text">{`Description: ${itemData.description}`}</div>
          </div>
          <div className="image">
            Image:{" "}
            <img
              src={itemData.image_url || ItemCardImage}
              onError={(e) => {
                e.target.src = ItemCardImage;
              }}
              alt="item"
            />
          </div>
        </Modal.Body>

        <Modal.Footer className="footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onUpdate()}
          >
            Update Item
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onDelete()}
          >
            Delete Item
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}
