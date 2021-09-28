import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import CustomCard from '../CustomDesign/CustomCard';
import CustomModal from '../CustomDesign/CustomModal';
import CustomTable from '../CustomDesign/CustomTable';
import { getUsers } from '../../services/authService';
import {
  GET_PROJECTS,
  GET_PROJECTS_FAILED,
  FETCH_USERS,
  ADD_ASSIGN_USER_PROJECT,
  ADD_ASSIGN_PROJECT_FAILED,
  DELETE_PROJECT,
  DELETE_PROJECT_FAILED,
} from '../../constants/action_type';
import AuthContext from '../ContextApi/Auth/AuthContext';
import ProjectAssignDetails from './projectAssignDetails';
import ProjectContext from '../ContextApi/project/ProjectContext';
import CustomAlertMessage from '../CustomDesign/CustomAlertMessage';
import CustomAlertModal from '../CustomDesign/CustomAlertModal';
import Loader from '../CustomDesign/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Search from './searchProject';
import {
  getProjects,
  assignedUserProject,
  projectDelete,
} from '../../services/projectServices';

function ProjectList(props) {
  const [assignUserProject, setAssignProject] = useState({
    user_id: '',
    project_id: '',
  });

  const [validated, setValidated] = useState(false);

  const [show, setShow] = useState(false);

  const [isloading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);

  const closeLoader = () => setLoading(false);

  const onShow = (id) => {
    setAssignProject({
      ...assignUserProject,
      project_id: id,
    });
    if (checkRole()) {
      setShow(true);
    }
  };

  const handleClose = () => setShow(false);

  const projectContext = useContext(ProjectContext);

  const authContext = useContext(AuthContext);

  const [showAlert, setShowAlert] = useState(false);

  const [alertType, setAlertType] = useState();

  const [alertModalShow, setAlertModalShow] = useState(false);

  const [alertMessage, setAlertMessage] = useState();

  const onCloseAlert = () => setShowAlert(false);

  const onConfirmation = (id) => {
    setAlertModalShow(true);
  };

  const onClose = () => {
    setAlertModalShow(false);
  };

  const { user = [], auth } = authContext.state;

  const [users, setUsers] = useState();

  const { project = [] } = projectContext.state;

  function handleOnChange(e) {
    setAssignProject({ ...assignUserProject, [e.target.name]: e.target.value });
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    assignedUserProject(assignUserProject)
      .then((response) => {
        if (response) {
          projectContext.dispatch({
            type: ADD_ASSIGN_USER_PROJECT,
            payload: response,
          });
        }
        setShowAlert(true);
        setAlertType('success');
        setAlertMessage('Assign Project to User SuccessFully');
      })
      .catch((error) => {
        if (error) {
          projectContext.dispatch({
            type: ADD_ASSIGN_PROJECT_FAILED,
            payload: error,
          });
        }
        setShowAlert(true);
        setAlertType('danger');
        setAlertMessage(error.data.message);
      });
  }
  useEffect(() => {
    showLoader();
    getProjects()
      .then((response) => {
        if (response) {
          projectContext.dispatch({
            type: GET_PROJECTS,
            payload: response,
          });
        }
        closeLoader();
      })
      .catch((error) => {
        projectContext.dispatch({
          type: GET_PROJECTS_FAILED,
          payload: error,
        });
        closeLoader();
      });

    getUsers().then((response) => {
      if (response) {
        authContext.dispatch({
          type: FETCH_USERS,
          payload: response,
        });
      }
      setUsers({
        users: response,
      });
    });
  }, []);

  function deleteProject(id) {
    projectDelete(id)
      .then((response) => {
        if (response) {
          projectContext.dispatch({
            type: DELETE_PROJECT,
            payload: id,
          });
        }
        setShowAlert(true);
        setAlertType('success');
        setAlertMessage('record delete successfully');
        onClose();
      })
      .catch((error) => {
        projectContext.dispatch({
          type: DELETE_PROJECT_FAILED,
          payload: error.data.message,
        });
        setShowAlert(true);
        setAlertType('danger');
        setAlertMessage(error.data.message);
      });
  }

  function checkRole() {
    if (auth.role === 'Manager') {
      return true;
    }
    return false;
  }

  return (
    <>
      <CustomModal title='Assign Project' show={show} handleClose={handleClose}>
        <CustomAlertMessage
          alertType={alertType}
          show={showAlert}
          alertMessage={alertMessage}
          onCloseAlert={onCloseAlert}
          messageBoxStyle={{
            width: '25rem',
          }}
        />
        <Form onSubmit={handleOnSubmit}>
          <Form.Row>
            <Form.Group as={Col} md='8' sm='12' controlId='formGridCity'>
              <Form.Label>user</Form.Label>
              <Form.Control
                as='select'
                name='user_id'
                onChange={handleOnChange}
                value={assignUserProject.user_id}
                selected
              >
                <option>Select User</option>
                {user
                  ? user.map((u) => {
                      return (
                        <option key={u.id} value={u.id}>
                          {u.name}
                        </option>
                      );
                    })
                  : ''}
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
        <ProjectAssignDetails />
      </CustomModal>

      <CustomCard
        Cardstyles={{
          width: 'auto',
        }}
        cardHeaderStyle={{
          backgroundColor: '#fff',
          borderBottom: 0,
        }}
      >
        <Search />
        <CustomAlertMessage
          alertType={alertType}
          show={showAlert}
          alertMessage={alertMessage}
          onCloseAlert={onCloseAlert}
          messageBoxStyle={{
            width: '25rem',
          }}
        />
        <CustomTable
          tableHead={[
            'Project Name',
            'Project Description',
            'Others',
            'Action',
          ]}
        >
          {isloading ? (
            <Loader size='lg' />
          ) : (
            <>
              {project.map((p, index) => {
                return (
                  <tr key={`p-${index}`}>
                    <td> {p.project_name}</td>
                    <td> {p.description}</td>
                    <td>{p.other_details}</td>
                    <td>
                      {checkRole() && (
                        <>
                          <FontAwesomeIcon
                            icon='tasks'
                            size='md'
                            className='text-primary m-1'
                            onClick={onShow.bind(this, p.id)}
                          />
                          <FontAwesomeIcon
                            icon='edit'
                            size='md'
                            className='text-primary m-1'
                            onClick={props.handleShowUpdateModel.bind(this, p)}
                          />
                          <CustomAlertModal
                            alertModalShow={alertModalShow}
                            cancelAction={onClose}
                            alertText='Are you sure you want to delete this item?'
                            cancelText='cancel'
                            confirmText='Confirm'
                            confirmedAction={deleteProject.bind(this, p.id)}
                          />
                          <FontAwesomeIcon
                            icon='trash'
                            size='md'
                            className='text-danger m-1'
                            onClick={onConfirmation.bind(this, p.id)}
                          />
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </>
          )}
        </CustomTable>
      </CustomCard>
    </>
  );
}

export default ProjectList;
