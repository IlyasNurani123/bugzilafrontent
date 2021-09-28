import React, { useEffect, useState, useContext } from 'react';
import SideMainLayout from '../CustomDesign/SideMainLayout';
import { Container, Row, Col } from 'react-bootstrap';
import { getBugImages } from '../../services/bugServices';
import BugContext from '../ContextApi/Bug/BugContext';
import Loader from '../CustomDesign/Loader';
import {
  GET_BUG_IMAGES,
  GET_BUG_IMAGES_FAILED,
} from '../../constants/action_type';

function BugGallery() {
  const [isloading, setLoading] = useState(false);

  const bugContext = useContext(BugContext);

  const { bugImages = [] } = bugContext.state;

  const showLoader = () => setLoading(true);

  const closeLoader = () => setLoading(false);
  useEffect(() => {
    showLoader();
    getBugImages()
      .then((response) => {
        closeLoader();
        if (response) {
          bugContext.dispatch({
            type: GET_BUG_IMAGES,
            payload: response,
          });
          console.log('test bugcontext', response);
        }
      })
      .catch((error) => {
        closeLoader();
        if (error) {
          bugContext.dispatch({
            type: GET_BUG_IMAGES_FAILED,
            payload: error,
          });
        }
      });
  }, []);
  return (
    <SideMainLayout>
      <Container>
        <Row>
          {console.log('this is bug inmages', bugImages)}
          {bugImages.map((img, index) => {
            return (
              <>
                <Col>
                  <img
                    src={(`img:image/png;base64,`, img.bug_screen_shot_img)}
                  />
                  <h1>test case</h1>
                </Col>
                <Col></Col>
                <Col></Col>
              </>
            );
          })}
        </Row>
      </Container>
    </SideMainLayout>
  );
}

export default BugGallery;
