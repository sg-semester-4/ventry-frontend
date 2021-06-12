import React, { Component } from "react";
import { Modal, Nav } from "react-bootstrap";

import ItemCardImage from "../../assets/images/item-management-card-img.svg";
import "./Styles/InventoryControlViewModalStyle.css";

class MainComponent extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { parent } = this.props;
    const { data } = parent.props.parent.state.viewInventoryControlResponse;
    return (
      <div className="main">
        <div className="id">
          <div className="text">{`ID: ${data.id}`}</div>
        </div>
        <div className="code">
          <div className="text">{`Code: ${data.item.code}`}</div>
        </div>
        <div className="name">
          <div className="text">{`Name: ${data.item.name}`}</div>
        </div>
        <div className="control-quantity">
          <div className="text">
            {`Control Quantity: ${parseFloat(data.quantity)}`}
          </div>
        </div>
        <div className="unit-type">
          <div className="text">{`Unit Type: ${data.item.unit_type}`}</div>
        </div>
        <div className="unit-cost-price">
          <div className="text">
            {`Unit Cost Price: ${parseFloat(data.item.unit_cost_price)}`}
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
            src={data.item.image_url || ItemCardImage}
            onError={(e) => {
              e.target.src = ItemCardImage;
            }}
            alt="item"
          />
        </div>
      </div>
    );
  }
}

class InventoryControlViewModalComponent extends Component {
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
        className="component item-view-modal"
      >
        <Modal.Header closeButton className="header">
          <Modal.Title>Inventory Control Details</Modal.Title>
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
            Update Control
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onDelete()}
          >
            Delete Control
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default InventoryControlViewModalComponent;
