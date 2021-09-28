import React, { useEffect, useContext } from 'react';
import SideMainLayout from '../CustomDesign/SideMainLayout';
import { Container, Row, Col } from 'react-bootstrap';
import { getUsers, verifyToken } from '../../services/authService';
import { getBugs } from '../../services/bugServices';
import BugContext from '../ContextApi/Bug/BugContext';
import AuthContext from '../ContextApi/Auth/AuthContext';
import Board from '../Board/Board';
import {
  GET_BUGS,
  GET_BUGS_FAILED,
  FETCH_USERS,
  FETCH_USERS_FAILED,
  SET_AUTH_USER,
} from '../../constants/action_type';
import CustomCard from '../CustomDesign/CustomCard';

function Index(props) {
  const bugContex = useContext(BugContext);
  const authContext = useContext(AuthContext);
  const { user = [] } = authContext.state;
  const { bugs = [] } = bugContex.state;

  useEffect(() => {
    getUsers()
      .then((response) => {
        if (response) {
          authContext.dispatch({
            type: FETCH_USERS,
            payload: response,
          });
        }
      })
      .catch((error) => {
        if (error) {
          authContext.dispatch({
            type: FETCH_USERS_FAILED,
            payload: error,
          });
        }
      });
    getBugs()
      .then((response) => {
        if (response) {
          bugContex.dispatch({
            type: GET_BUGS,
            payload: response,
          });
        }
      })
      .catch((error) => {
        bugContex.dispatch({
          type: GET_BUGS_FAILED,
          payload: error,
        });
      });
    verifyToken()
      .then((response) => {
        authContext.dispatch({ type: SET_AUTH_USER, payload: response.data });
      })
      .catch(() => {
        authContext.dispatch({
          type: 'TOGGLE_AUTHENTICATED',
          payload: false,
        });
      });
  }, []);

  function formateData(data) {
    return data.map((d) => ({
      title: d.title,
      dead_line: d.dead_line,
      type: d.type,
      status: d.status,
      priority: d.priority,
    }));
  }
  return (
    <SideMainLayout>
      <div className='m-4'>
        <h3>Bugs</h3>
      </div>
      <Row>
        <Col>
          <Board title='Todo' data={formateData(bugs)} />
        </Col>
        <Col>
          <Board title='Progress' data={[]} />
        </Col>
        <Col>
          <Board title='Done' data={[]} />
        </Col>
      </Row>
    </SideMainLayout>
  );
}

export default Index;
