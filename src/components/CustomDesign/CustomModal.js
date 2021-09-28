import React, { Component } from 'react';
import ThemeContext from '../ContextApi/ThemeContext';
import { Modal } from 'react-bootstrap';
class CustomModal extends Component {
  static contextType = ThemeContext;
  render(props) {
    const theme = this.context;
    return (
      <>
        <Modal
          size='md'
          aria-labelledby='contained-modal-title-vcenter'
          centered
          show={this.props.show}
          onHide={this.props.handleClose}
          backdrop='static'
          keyboard={false}
          // style={{ background: theme.model.bg }}
          style={this.props.ModalStyle}
        >
          <Modal.Header closeButton style={this.props.modalHeaderStyle}>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.children}</Modal.Body>
        </Modal>
      </>
    );
  }
}

export default CustomModal;
