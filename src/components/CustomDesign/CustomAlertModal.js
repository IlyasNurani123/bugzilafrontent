import React from 'react';
import { Modal, Button } from 'react-bootstrap';
function CustomAlertModal(props) {
  return (
    <>
      <Modal
        size='md'
        aria-labelledby='contained-modal-title-vcenter'
        show={props.alertModalShow}
        backdrop='static'
        keyboard={false}
        style={props.ModalStyle}
      >
        <Modal.Body style={props.modalBodyStyle} className='text-align-center'>
          {props.alertText}
        </Modal.Body>
        <Modal.Footer style={{ borderBottom: 0 }}>
          <div className=''>
            <Button
              onClick={props.confirmedAction}
              variant='outline-info'
              size='sm'
            >
              {props.confirmText}
            </Button>
            <Button
              onClick={props.cancelAction}
              variant='outline-danger'
              size='sm'
              className='m-1'
            >
              {props.cancelText}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default CustomAlertModal;
