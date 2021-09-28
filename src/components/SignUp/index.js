import React, { useState } from 'react';
import CustomCard from '../CustomDesign/CustomCard';
import SideLessLayout from '../CustomDesign/SideLessLayout';
import * as ROUTES from '../../constants/routes';
import { Container, Form, Button } from 'react-bootstrap';
import { register } from '../../services/authService';
import CustomAlertMessage from '../CustomDesign/CustomAlertMessage';
import Loader from '../CustomDesign/Loader';

function Signup(props) {
  const [validated, setValidated] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const [alertType, setAlertType] = useState();

  const [alertMessage, setAlertMessage] = useState();

  const [isloading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);

  const closeLoader = () => setLoading(false);

  const onCloseAlert = () => setShowAlert(false);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role_type: '',
  });

  function onHandelChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
    // confirmPassword();
  }
  // function confirmPassword() {
  //   if (user.password !== user.confirmPassword) {
  //     console.log('password did not match');
  //   }
  // }

  function onHandleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      showLoader();
      register(user)
        .then((response) => {
          closeLoader();
          setShowAlert(true);
          setAlertType('success');
          setAlertMessage('Login SuccessFully');
          props.history.push(ROUTES.SIGN_IN);
        })
        .catch((error) => {
          closeLoader();
          setShowAlert(true);
          setAlertType('danger');
          setAlertMessage(error.data.message);
        });
    } else {
      setValidated(true);
    }
    e.stopPropagation();
  }
  return (
    <SideLessLayout>
      <CustomAlertMessage
        alertType={alertType}
        show={showAlert}
        alertMessage={alertMessage}
        onCloseAlert={onCloseAlert}
      />
      <CustomCard
        title='Register'
        cardHeaderStyle={{
          backgroundColor: '#fff',
          textAlign: 'center',
          fontSize: 25,
          height: '1rem',
          borderBottom: 0,
        }}
      >
        <Container>
          <Form noValidate validated={validated} onSubmit={onHandleSubmit}>
            <Form.Group controlId='formBasicName'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                name='name'
                onChange={onHandelChange}
                required
              />
              <Form.Control.Feedback type='invalid'>
                name is required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                name='email'
                onChange={onHandelChange}
                required
              />
              <Form.Control.Feedback type='invalid'>
                email is required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                name='password'
                onChange={onHandelChange}
                required
              />
              <Form.Control.Feedback type='invalid'>
                password is required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='formBasicConfirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confir Password'
                name='password_confirmation'
                onChange={onHandelChange}
                required
              />
              <Form.Control.Feedback type='invalid'>
                confirPasswor is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Select Role</Form.Label>
              <Form.Control
                size='md'
                as='select'
                name='role_type'
                onChange={onHandelChange}
              >
                <option>please select role type</option>
                <option>Manager</option>
                <option>QA</option>
                <option>developer</option>
              </Form.Control>
            </Form.Group>
            <Button type='submit' size='sm' block className='custom_button'>
              {isloading ? <Loader /> : 'Submit'}
            </Button>
          </Form>
        </Container>
      </CustomCard>
    </SideLessLayout>
  );
}

export default Signup;
