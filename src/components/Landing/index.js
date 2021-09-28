import React, { Component } from 'react';
import SideLessLayout from '../CustomDesign/SideLessLayout';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import LandingImage from '../../assets/images/sideImage.png';
class index extends Component {
  render() {
    return (
      <div>
        <SideLessLayout />
        <Container>
          <Row className='header_section'>
            <Col sm={12} lg={4} md={4}>
              <h1 className='header_title'>
                software development tool used by agile teams
              </h1>
              <Button className='mt-4' size='lg'>
                Get it Free
              </Button>
            </Col>
            <Col sm={12} lg={8} md={8} className='mt-3'>
              <img src={LandingImage} />
            </Col>
          </Row>
          <Row className='main_section'>
            <Col sm={12} lg={12} md={12}>
              <div>
                <h1>The best software teams ship early and often.</h1>
              </div>
              <div className='sub_heading'>
                <p>
                  Bugzilla Software is built for every member of your software
                  team to plan, track, and release great software.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default index;
