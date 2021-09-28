import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import CustomCard from '../CustomDesign/CustomCard';
import SideLessLayout from '../CustomDesign/SideLessLayout';
import * as ROUTES from '../../constants/routes';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { login } from '../../services/authService';
import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../../constants/action_type';
import Loader from '../CustomDesign/Loader';
import AuthContext from '../ContextApi/Auth/AuthContext';
import CustomAlertMessage from '../CustomDesign/CustomAlertMessage';

function Signin(props) {
  const [validated, setValidated] = useState(false);

  const accessAuthContext = useContext(AuthContext);

  const { error = [] } = accessAuthContext.state;

  console.log(error);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [isloading, setLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const [alertType, setAlertType] = useState();

  const [alertMessage, setAlertMessage] = useState();

  const onCloseAlert = () => setShowAlert(false);

  const showLoader = () => setLoading(true);

  const closeLoader = () => setLoading(false);

  const onChangeHandle = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      showLoader();
      login(user)
        .then((response) => {
          closeLoader();
          accessAuthContext.dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data,
            token: response.accessToken,
          });
          setShowAlert(true);
          setAlertType('success');
          setAlertMessage('Login SuccessFully');
          props.history.push(ROUTES.DASHBOARD);
        })
        .catch((err) => {
          closeLoader();
          accessAuthContext.dispatch({
            type: LOGIN_FAILURE,
            payload: err.data.message,
          });
          setShowAlert(true);
          setAlertType('danger');
          setAlertMessage(err.data.message);
        });
    }
    setValidated(true);
  };
  return (
    <SideLessLayout>
      <CustomAlertMessage
        alertType={alertType}
        show={showAlert}
        alertMessage={alertMessage}
        onCloseAlert={onCloseAlert}
      />
      <CustomCard
        title='Login'
        cardHeaderStyle={{
          backgroundColor: '#fff',
          textAlign: 'center',
          height: '2rem',
          fontSize: 25,
          marginTop: 10,
          borderBottom: 0,
        }}
      >
        <Container>
          <Form noValidate validated={validated} onSubmit={onHandleSubmit}>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                aria-describedby='inputGroupPrepend'
                name='email'
                onChange={onChangeHandle}
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
                onChange={onChangeHandle}
                required
              />
              <Form.Control.Feedback type='invalid'>
                Please choose a password.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Text className='mb-4'>
              <Link to='#forget'>forget password</Link>
            </Form.Text>
            <Button type='submit' size='sm' block className='custom_button'>
              {isloading ? <Loader /> : 'Submit'}
            </Button>
            <p className='singup-tip'>
              <span>Don't you have account?</span>
              <Link to={ROUTES.SIGN_UP} className='ml-2'>
                Signup
              </Link>
            </p>
          </Form>
        </Container>
      </CustomCard>
    </SideLessLayout>
  );
}
export default Signin;
