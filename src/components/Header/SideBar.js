import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import '../../assets/css/style.css';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ThemeContext from '../ContextApi/ThemeContext';
import AuthContext from '../ContextApi/Auth/AuthContext';

function SideBarLayout() {
  const themeContext = useContext(ThemeContext);
  const authContext = useContext(AuthContext);
  const { auth } = authContext.state;
  return (
    <div
      className='sidebar'
      style={{
        background: themeContext.skyBlue.bg,
        color: themeContext.skyBlue.syntax,
      }}
    >
      <Nav className='side-menu-items' fixed='top'>
        <div className=' user_text'>
          <div className='user-icon'>
            <FontAwesomeIcon icon='user' size='lg' className='text-white ' />
          </div>
          <div className='user-icon'>
            <p className='text-white'>{auth.name}</p>
          </div>
        </div>
        <hr></hr>
        <Nav.Item>
          <span className='m-3'>
            <FontAwesomeIcon
              icon='tachometer-alt'
              size='sm'
              className='text-white'
            />
          </span>
          <Link to={ROUTES.DASHBOARD} className='text-white'>
            Dashboard
          </Link>
        </Nav.Item>
        <Nav.Item>
          <span className='m-3'>
            <FontAwesomeIcon icon='folder' size='sm' />
          </span>
          <Link to={ROUTES.PROJECTS} className='text-white'>
            Project
          </Link>
        </Nav.Item>
        <Nav.Item>
          <span className='m-3'>
            <FontAwesomeIcon icon='eraser' size='sm' />
          </span>
          <Link to={ROUTES.BUGS} className='text-white'>
            Bugs
          </Link>
        </Nav.Item>
        <Nav.Item>
          <span className='m-3'>
            <FontAwesomeIcon icon='image' size='sm' />
          </span>
          <Link to={ROUTES.BUGS_GALLERY} className='text-white'>
            Bugs gallery
          </Link>
        </Nav.Item>
        <hr></hr>
        <Nav.Item>
          <span className='m-3'>
            <FontAwesomeIcon icon='power-off' size='sm' />
          </span>
          <Link to='#deets' className='text-white'>
            LogOut
          </Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default SideBarLayout;
