import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import SideMainLayout from '../CustomDesign/SideMainLayout';
import CustomModel from '../CustomDesign/CustomModal';
import '../../assets/css/style.css';
import ProjectList from '../Project/projectList';
import { addProject, updateProject } from '../../services/projectServices';
import ProjectContext from '../ContextApi/project/ProjectContext';
import AuthContext from '../ContextApi/Auth/AuthContext';
import {
  ADD_PROJECT,
  ADD_PROJECTS_FAILED,
  UPDATE_PROJECT,
  UPDATE_PROJECT_FAILED,
} from '../../constants/action_type';
import CustomAlertMessage from '../CustomDesign/CustomAlertMessage';
import Loader from '../CustomDesign/Loader';

function Index(props) {
  const [project, setProject] = useState({
    project_name: '',
    description: '',
    other_details: '',
    id: '',
  });

  const [validated, setValidated] = useState(false);

  const [show, setShow] = useState(false);

  const onShow = () => {
    if (checkRole()) {
      setShow(true);
    }
  };

  const handleShowUpdateModel = (p) => {
    if (checkRole()) {
      setShow(true);
      setProject({
        project_name: p.project_name,
        description: p.description,
        other_details: p.other_details,
        id: p.id,
      });
    }
  };

  // const handleCloseUpdateModel = () => {
  //   setShow(false);
  // };

  const handleClose = () => setShow(false);

  const [showAlert, setShowAlert] = useState(false);

  const [alertType, setAlertType] = useState();

  const [alertMessage, setAlertMessage] = useState();

  const onCloseAlert = () => setShowAlert(false);

  const [isloading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);

  const closeLoader = () => setLoading(false);

  const projectContext = useContext(ProjectContext);

  const authContext = useContext(AuthContext);
  const { user = [], auth } = authContext.state;

  function handleOnChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!project.id) {
      if (form.checkValidity()) {
        showLoader();
        addProject(project)
          .then((response) => {
            closeLoader();
            projectContext.dispatch({
              type: ADD_PROJECT,
              payload: response,
            });
            setShowAlert(true);
            setAlertType('success');
            setAlertMessage('Project Create SuccessFully');
            handleClose();
          })
          .catch((error) => {
            closeLoader();
            projectContext.dispatch({
              type: ADD_PROJECTS_FAILED,
              payload: error,
            });
            setShowAlert(true);
            setAlertType('danger');
            setAlertMessage(error);
          });
      }
      setValidated(true);
    } else {
      if (form.checkValidity()) {
        showLoader();
        updateProject(project.id, project)
          .then((response) => {
            closeLoader();
            projectContext.dispatch({
              type: UPDATE_PROJECT,
              payload: response,
            });
            setShowAlert(true);
            setAlertType('success');
            setAlertMessage('Project Update SuccessFully');
            handleClose();
          })
          .catch((error) => {
            closeLoader();
            projectContext.dispatch({
              type: UPDATE_PROJECT_FAILED,
              payload: error,
            });
            setShowAlert(true);
            setAlertType('danger');
            setAlertMessage(error);
            handleClose();
          });
      }
      setValidated(true);
    }
  };

  function checkRole() {
    if (auth.role === 'Manager') {
      return true;
    }
    return false;
  }

  return (
    <SideMainLayout>
      <CustomAlertMessage
        alertType={alertType}
        show={showAlert}
        alertMessage={alertMessage}
        onCloseAlert={onCloseAlert}
      />

      <div className='page_header'>
        <h3 className='ml-5'>Project</h3>
        <span className='mr-5'>
          {checkRole() && (
            <Button size='sm' onClick={onShow}>
              Create Project
            </Button>
          )}
        </span>
      </div>
      <ProjectList handleShowUpdateModel={handleShowUpdateModel} />
      <CustomModel
        title={project.id ? 'Update project' : 'Add Project'}
        show={show}
        handleClose={handleClose}
      >
        <Form noValidate validated={validated} onSubmit={handleOnSubmit}>
          <Form.Group controlId='formGridCity'>
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type='text'
              name='project_name'
              value={project.project_name}
              onChange={handleOnChange}
              required
            />
            <Form.Control.Feedback type='invalid'>
              project name is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId='formGridCity'>
            <Form.Label>Project Description</Form.Label>
            <Form.Control
              as='textarea'
              aria-label='With textarea'
              name='description'
              value={project.description}
              onChange={handleOnChange}
              required
            />
            <Form.Control.Feedback type='invalid'>
              description is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId='formGridZip'>
            <Form.Label>Other Details</Form.Label>
            <Form.Control
              as='textarea'
              aria-label='With textarea'
              name='other_details'
              value={project.other_details}
              onChange={handleOnChange}
            />
          </Form.Group>
          <Button type='submit' size='sm' block className='custom_button'>
            {isloading ? <Loader /> : 'Submit'}
          </Button>
        </Form>
      </CustomModel>
    </SideMainLayout>
  );
}

export default Index;
