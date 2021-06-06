import React, { Component } from "react";
import { Modal, Nav } from "react-bootstrap";

import ItemCardImage from "../../assets/images/item-management-card-img.svg";
import "./Styles/ItemViewModalStyle.css";

class MainComponent extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { parent } = this.props;
    const { data } = parent.props.parent.state.viewItemResponse;
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
        <div className="max-estimate-quantity">
          <div className="text">
            {`Max Estimate Quantity: ${parseFloat(data.max_estimate_quantity)}`}
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
        <div className="description">
          <div className="text">{`Description: ${data.description}`}</div>
        </div>
        <div className="image">
          Image:{" "}
          <img
            src={data.image_url || ItemCardImage}
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

class CombinationComponent extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { quantity } = this.state;
    const { parent } = this.props;
    const {
      allItemCombinationResponse,
      viewItemResponse,
    } = parent.props.parent.state;
    return (
      <div className="combination">
        <div className="table-ic">
          <table className="table ">
            <thead>
              <tr>
                <th scope="col">Child Item ID</th>
                <th scope="col">Code</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {allItemCombinationResponse.data
                .filter(
                  (itm) => itm.parent_item_id === viewItemResponse.data.id
                )
                .map((val, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{val.child_item_id}</td>
                      <td>{val.child_item.code}</td>
                      <td>{val.child_item.name}</td>
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

class ItemViewModalComponent extends Component {
  constructor() {
    super();
    this.state = {
      isShow: false,
      itemCombinationData: [],
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
          <Modal.Title>Item Details</Modal.Title>
        </Modal.Header>

        <Nav variant="tabs" onSelect={this.handleSelectMenu}>
          <Nav.Item>
            <Nav.Link eventKey="main">Main</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="combination">Combination</Nav.Link>
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
              combination: (
                <CombinationComponent
                  parent={this}
                  ref={(ref) => {
                    this.refCombinationComponent = ref;
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

export default ItemViewModalComponent;
