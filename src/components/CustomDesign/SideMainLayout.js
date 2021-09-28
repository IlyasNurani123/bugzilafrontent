import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Navbar from '../Header';
import Sidebar from '../Header/SideBar';

function SideMainLayout(props) {
  return (
    <>
      <Row className='customRow'>
        <Col lg={2} md={2}>
          <Sidebar />
        </Col>
        <Col lg={10} md={10}>
          <Navbar />
          <div style={{ marginTop: '6rem' }}>{props.children}</div>
        </Col>
      </Row>
    </>
  );
}

export default SideMainLayout;
