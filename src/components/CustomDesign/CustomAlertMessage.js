import React from 'react';
import { Alert, Container, Row, Col } from 'react-bootstrap';
import '../../assets/css/style.css';

function CustomAlertMessage(props) {
  return (
    <Container>
      <Alert
        variant={props.alertType}
        show={props.show}
        onClose={props.onCloseAlert}
        dismissible
        style={props.messageBoxStyle}
        className='alertMessageCard'
      >
        <p className='d-flex justify-content-center text-align-center'>
          {props.alertMessage}
        </p>
      </Alert>
    </Container>
  );
}

export default CustomAlertMessage;
