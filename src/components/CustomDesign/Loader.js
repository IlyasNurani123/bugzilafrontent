import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loader(props) {
  return (
    <Spinner
      animation='border'
      // animation={props.animation}
      role='status'
      size={props.size}
      className='d-flex justify-content-center'
      style={props.loaderStyle}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
}

export default Loader;
