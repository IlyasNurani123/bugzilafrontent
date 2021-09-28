import React, { useState, useEffect, useContext } from 'react';
import { Button, Form, Col, Pagination } from 'react-bootstrap';
import { getBugs, assignBug, bugDelete } from '../../services/bugServices';
import { getUsers } from '../../services/authService';
import BugContext from '../ContextApi/Bug/BugContext';
import AuthContext from '../ContextApi/Auth/AuthContext';
import CustomModal from '../CustomDesign/CustomModal';
import CustomCard from '../CustomDesign/CustomCard';
import CustomTable from '../CustomDesign/CustomTable';
import CustomAlertMessage from '../CustomDesign/CustomAlertMessage';
import CustomAlertModal from '../CustomDesign/CustomAlertModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from '../CustomDesign/Loader';
import Search from './searchBug';
import {
  GET_BUGS,
  GET_BUGS_FAILED,
  ASSIGN_BUGS_TO_USER,
  ASSIGN_BUGS_TO_USER_FAILED,
  FETCH_USERS,
  FETCH_USERS_FAILED,
  DELETE_BUG,
  DELETE_BUG_FAILED,
} from '../../constants/action_type';

function BugLists(props) {
  const [assignUserBug, setAssignBug] = useState({
    user_id: '',
    bug_id: null,
  });

  const [validated, setValidated] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const [alertType, setAlertType] = useState();

  const [alertMessage, setAlertMessage] = useState();

  const onCloseAlert = () => setShowAlert(false);

  const [show, setShow] = useState(false);

  const [alertModalShow, setAlertModalShow] = useState(false);

  const [isloading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);

  const closeLoader = () => setLoading(false);

  const onConfirmation = (id) => {
    setAssignBug({
      bug_id: id,
    });
    setAlertModalShow(true);
  };

  const onClose = () => {
    setAlertModalShow(false);
  };

  const onShow = (id) => {
    setAssignBug({
      bug_id: id,
    });
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const bugContex = useContext(BugContext);

  const { bugs = [] } = bugContex.state;

  const authContext = useContext(AuthContext);

  const { user = [], auth } = authContext.state;

  function handleOnChange(e) {
    setAssignBug({ ...assignUserBug, [e.target.name]: e.target.value });
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    showLoader();
    assignBug(assignUserBug, assignUserBug.bug_id)
      .then((response) => {
        closeLoader();
        if (response) {
          bugContex.dispatch({
            type: ASSIGN_BUGS_TO_USER,
            payload: response,
          });
        }
        setShowAlert(true);
        setAlertType('success');
        setAlertMessage('Assign Bugs SuccessFully');
        handleClose();
      })
      .catch((error) => {
        closeLoader();
        bugContex.dispatch({
          type: ASSIGN_BUGS_TO_USER_FAILED,
          payload: error,
        });
        setShowAlert(true);
        setAlertType('danger');
        setAlertMessage(error.data.message);
      });
  }

  useEffect(() => {
    showLoader();
    getUsers()
      .then((response) => {
        closeLoader();
        if (response) {
          authContext.dispatch({
            type: FETCH_USERS,
            payload: response,
          });
        }
      })
      .catch((error) => {
        closeLoader();
        if (error) {
          authContext.dispatch({
            type: FETCH_USERS_FAILED,
            payload: error,
          });
        }
      });
    getBugs()
      .then((response) => {
        closeLoader();
        if (response) {
          bugContex.dispatch({
            type: GET_BUGS,
            payload: response,
          });
        }
      })
      .catch((error) => {
        closeLoader();
        bugContex.dispatch({
          type: GET_BUGS_FAILED,
          payload: error,
        });
      });
  }, []);

  function deleteBug(id) {
    bugDelete(id)
      .then((res) => {
        onClose();
        if (res) {
          bugContex.dispatch({
            type: DELETE_BUG,
            payload: id,
          });
        }
        setShowAlert(true);
        setAlertType('success');
        setAlertMessage('Delete Bug SuccessFully');
      })
      .catch((err) => {
        bugContex.dispatch({
          type: DELETE_BUG_FAILED,
          payload: err,
        });
        setShowAlert(true);
        setAlertType('danger');
        setAlertMessage(err.data.message);
      });
  }

  function checkRole() {
    if (auth.role === 'QA') {
      return true;
    }
    return false;
  }

  return (
    <>
      <CustomModal title='Assign Bug' show={show} handleClose={handleClose}>
        <CustomAlertMessage
          alertType={alertType}
          show={showAlert}
          alertMessage={alertMessage}
          onCloseAlert={onCloseAlert}
        />
        <Form onSubmit={handleOnSubmit}>
          <Form.Row>
            <Form.Group as={Col} md='8' sm='12' controlId='formGridCity'>
              <Form.Label>user</Form.Label>
              <Form.Control
                as='select'
                name='user_id'
                onChange={handleOnChange}
                value={assignUserBug.user_id}
                selected
              >
                <option>Select User</option>
                {user.map((u) => {
                  return (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md='3' sm='12' controlId='formGridCity'>
              <Button
                type='onClick'
                size='sm'
                style={{ margin: 20, marginTop: 35 }}
              >
                Assign
              </Button>
            </Form.Group>
          </Form.Row>
        </Form>
      </CustomModal>
      {/* <Pagination> */}
      <CustomCard
        Cardstyles={{
          width: '65rem',
        }}
        cardHeaderStyle={{
          backgroundColor: '#fff',
          borderBottom: 0,
        }}
      >
        <CustomAlertMessage
          alertType={alertType}
          show={showAlert}
          alertMessage={alertMessage}
          onCloseAlert={onCloseAlert}
        />
        <Search />
        <CustomTable
          tableHead={[
            'Title',
            'Deadline',
            'Status',
            'Type',
            'Priority',
            'Assign To',
            'Project',
            'Action',
          ]}
        >
          {isloading ? (
            <Loader size='lg' />
          ) : (
            <>
              {bugs.map((bug, index) => {
                return (
                  <tr key={`bug-${index}`}>
                    <td> {bug.title}</td>
                    <td> {bug.dead_line}</td>
                    <td>{bug.status}</td>
                    <td>{bug.type}</td>
                    <td>{bug.priority}</td>
                    <td>{bug.user_name}</td>
                    <td>{bug.project_name}</td>
                    <td>
                      {checkRole() && (
                        <FontAwesomeIcon
                          icon='tasks'
                          className='text-primary m-1'
                          onClick={onShow.bind(this, bug.id)}
                        />
                      )}

                      <CustomAlertModal
                        alertModalShow={alertModalShow}
                        cancelAction={onClose}
                        alertText='Are you sure you want to delete this item?'
                        cancelText='cancel'
                        confirmText='Confirm'
                        confirmedAction={deleteBug.bind(this, bug.id)}
                      />

                      <FontAwesomeIcon
                        icon='trash'
                        className='text-danger m-1'
                        onClick={onConfirmation.bind(this, bug.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </>
          )}
        </CustomTable>
      </CustomCard>
      {/* <Pagination.First />
        <Pagination.Item></Pagination.Item>
        <Pagination.Ellipsis />
      </Pagination> */}
    </>
  );
}

export default BugLists;
