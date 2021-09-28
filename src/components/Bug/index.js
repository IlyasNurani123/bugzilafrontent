import React, { useState, useEffect, useContext } from 'react';
import { Button, Form, Col, File } from 'react-bootstrap';
import SideMainLayout from '../CustomDesign/SideMainLayout';
import CustomModel from '../CustomDesign/CustomModal';
import BugLists from './bugLists';
import ProjectContext from '../ContextApi/project/ProjectContext';
import BugContext from '../ContextApi/Bug/BugContext';
import AuthContext from '../ContextApi/Auth/AuthContext';
import CustomAlertMessage from '../CustomDesign/CustomAlertMessage';
import { getProjects } from '../../services/projectServices';
import { addBug } from '../../services/bugServices';
import Loader from '../CustomDesign/Loader';
import {
  GET_PROJECTS,
  ADD_BUG,
  ADD_BUG_FAILED,
} from '../../constants/action_type';

function Index() {
  const [bug, setBug] = useState({
    title: '',
    dead_line: '',
    type: '',
    project_id: '',
    status: '',
    bug_screen_shot_img: '',
  });

  // const [bugImg, setBugImg] = useState({
  //   bug_screen_shot_img: '',
  // });

  const [validated, setValidated] = useState(false);

  const [show, setShow] = useState(false);

  const [isloading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);

  const closeLoader = () => setLoading(false);

  const onShow = () => {
    if (checkRole()) {
      setShow(true);
    }
  };

  const handleClose = () => setShow(false);

  const [showAlert, setShowAlert] = useState(false);

  const [alertType, setAlertType] = useState();

  const [alertMessage, setAlertMessage] = useState();

  const onCloseAlert = () => setShowAlert(false);

  const projectContext = useContext(ProjectContext);
  const { project = [] } = projectContext.state;

  const authContext = useContext(AuthContext);
  const { auth } = authContext.state;

  const bugContext = useContext(BugContext);

  function handleOnChange(e) {
    setBug({ ...bug, [e.target.name]: e.target.value });
  }

  function handleImageOnChange(e) {
    // setBug({ ...bug, bug_screen_shot_img: e.target.files[0] });
    // let files = e.target.files || e.dataTransfer.files;
    // if (!files.length) return;
    // createImage(files[0]);
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      // let results = e.target.result;
      // console.warn(results);
      // const formData = { file: };
      setBug({ ...bug, bug_screen_shot_img: e.target.result });
      // console.log('image data', bug.bug_screen_shot_img);
    };
  }

  // function createImage(file) {
  //   let reader = new FileReader();
  //   reader.onload = (e) => {
  //     setBugImg({ bug_screen_shot_img: e.target.result });
  //   };
  //   reader.readAsDataURL(file);
  // }

  function handleOnSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      showLoader();
      addBug(bug)
        .then((response) => {
          if (response) {
            bugContext.dispatch({
              type: ADD_BUG,
              payload: response,
            });
          }
          closeLoader();
          setShowAlert(true);
          setAlertType('success');
          setAlertMessage('Create Bugs SuccessFully');
          handleClose();
        })
        .catch((error) => {
          bugContext.dispatch({
            type: ADD_BUG_FAILED,
            payload: error,
          });
          setShowAlert(true);
          setAlertType('danger');
          setAlertMessage(error.data.message);
          closeLoader();
        });
    }
    setValidated(true);
  }
  useEffect(() => {
    showLoader();
    getProjects().then((response) => {
      closeLoader();
      if (response) {
        projectContext.dispatch({
          type: GET_PROJECTS,
          payload: response,
        });
      }
    });
  }, []);

  function checkRole() {
    if (auth.role === 'QA') {
      return true;
    }
    return false;
  }

  return (
    <SideMainLayout>
      <div className='page_header'>
        <h3 className='ml-5'>Bugs</h3>
        {checkRole() && (
          <span className='mr-5'>
            <Button size='sm' onClick={onShow}>
              Create bug
            </Button>
          </span>
        )}
      </div>
      <BugLists />
      <CustomModel
        title='Add Bug'
        show={show}
        handleClose={handleClose}
        enctype='multipart/form-data'
      >
        <CustomAlertMessage
          alertType={alertType}
          show={showAlert}
          alertMessage={alertMessage}
          onCloseAlert={onCloseAlert}
        />
        <Form
          noValidate
          validated={validated}
          onSubmit={handleOnSubmit}
          enctype='multipart/form-data'
        >
          <Form.Row>
            <Form.Group as={Col} md='6' sm='12' controlId='formTitle'>
              <Form.Label>Bug Title</Form.Label>
              <Form.Control
                as='textarea'
                aria-label='With textarea'
                name='title'
                value={bug.title}
                onChange={handleOnChange}
                required
              />
              <Form.Control.Feedback type='invalid'>
                Bug title is required.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md='6' sm='12'>
              <Form.Label> Deadline</Form.Label>
              <Form.Control
                type='date'
                name='dead_line'
                value={bug.dead_line}
                onChange={handleOnChange}
              />
              <Form.Control.Feedback type='invalid'>
                Dead Line is required.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md='6' sm='12' controlId='formGridCity'>
              <Form.Label>Type</Form.Label>
              <Form.Control
                as='select'
                name='type'
                onChange={handleOnChange}
                value={bug.type}
                required
              >
                <option>please Select Type</option>
                <option value='feature'>feature</option>
                <option value='bug'>bug</option>
              </Form.Control>
              <Form.Control.Feedback type='invalid'>
                Type is required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md='6' sm='12' controlId='formGridCity'>
              <Form.Label>Status</Form.Label>
              <Form.Control
                as='select'
                name='status'
                onChange={handleOnChange}
                value={bug.status}
                defaultValue='Please Status'
                required
              >
                <option>Please select Status</option>
                <option>new</option>
                <option>start</option>
                <option>completed</option>
              </Form.Control>
              <Form.Control.Feedback type='invalid'>
                Type is required.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md='6' sm='12' controlId='formGridCity'>
              <Form.Label>Project</Form.Label>
              <Form.Control
                as='select'
                name='project_id'
                onChange={handleOnChange}
                value={bug.project_id}
                selected
                required
              >
                <option>Select project</option>
                {project.map((project, id) => {
                  return (
                    <option key={id} value={project.id}>
                      {project.project_name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md='6' sm='12' controlId='formGridCity'>
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as='select'
                name='priority'
                onChange={handleOnChange}
                value={bug.priority}
                required
              >
                <option>please select priority</option>
                <option>heigh</option>
                <option>medium</option>
                <option>normal</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md='12' sm='12' controlId='formGridCity'>
              <Form.Control
                className='position-relative'
                type='file'
                name='bug_screen_shot_img'
                multiple
                label='select images'
                // value={bug.bug_screen_shot_img}
                onChange={(e) => handleImageOnChange(e)}
                // value={bug.bug_screen_shot_img}
              />
            </Form.Group>
            <Form.Group as={Col} md='6' sm='12' controlId='formGridCity'>
              {/* {imgPreview} */}
            </Form.Group>
          </Form.Row>
          <Button type='submit' size='sm' block className='custom_button'>
            {isloading ? <Loader /> : 'Submit'}
          </Button>
        </Form>
      </CustomModel>
    </SideMainLayout>
  );
}

export default Index;
