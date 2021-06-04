import React, { Component } from "react";
import { Modal } from "react-bootstrap";

export default class FooterComponent extends Component {
  constructor() {
    super();
    this.state = {
      isShow: false,
      title: "",
      content: "",
    };
  }

  handleShow = () => {
    const { isShow } = this.state;
    this.setState({ isShow: !isShow });
  };

  render() {
    const { isShow, title, content } = this.state;
    const { header, body } = this.props;
    return (
      <Modal show={isShow} onHide={this.handleShow}>
        <Modal.Header closeButton>
          {header || <Modal.Title>{title}</Modal.Title>}
        </Modal.Header>
        <Modal.Body>{body || content}</Modal.Body>
      </Modal>
    );
  }
}
