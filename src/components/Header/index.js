import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';
import '../../assets/css/style.css';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import ThemeContext from '../ContextApi/ThemeContext';
import { logOut } from '../../services/authService';
import AuthContext from '../ContextApi/Auth/AuthContext';

class index extends Component {
  static contextType = ThemeContext;

  handleLogout(dispatch) {
    logOut()
      .then((response) => {
        dispatch({
          type: 'TOGGLE_AUTHENTICATED',
          payload: false,
        });
        this.props.history.push(ROUTES.LANDING);
      })
      .catch(() => {
        dispatch({
          type: 'TOGGLE_AUTHENTICATED',
          payload: false,
        });
        this.props.history.push(ROUTES.LANDING);
      });
  }
  // static contextType = AuthContext;
  render() {
    const { skyBlue } = this.context;
    return (
      <AuthContext.Consumer>
        {(authContext) => (
          <Navbar
            fixed='top'
            className='custom_navbar'
            style={{ background: skyBlue.bg }}
          >
            <Navbar.Brand className='log text-white'>
              <Link to={ROUTES.LANDING} className='text-white'>
                BUGZILLA
              </Link>
            </Navbar.Brand>
            {!authContext.state.isAuthenticated ? (
              <>
                <Link to={ROUTES.LANDING} className='ml-4 text-white'>
                  Home
                </Link>
                <Navbar.Toggle />
                <Navbar.Collapse className='justify-content-end m-auto text-white'>
                  <Link to={ROUTES.SIGN_IN} className='text-white sign-in'>
                    Signin
                  </Link>
                  <Link to={ROUTES.SIGN_UP} className='ml-3 text-white sign-up'>
                    Signup
                  </Link>
                </Navbar.Collapse>
              </>
            ) : (
              <>
                <Link
                  onClick={this.handleLogout.bind(this, authContext.dispatch)}
                  className='text-white ml-auto'
                  to='#'
                >
                  Logout
                </Link>
              </>
            )}
          </Navbar>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default withRouter(index);
