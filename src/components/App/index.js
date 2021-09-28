import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../../assets/css/style.css';
import ThemProvider from '../ContextApi/ThemeProvider';
import ProjectProvider from '../ContextApi/project/ProjectProvider';
import BugProvider from '../ContextApi/Bug/BugProvider';
import { verifyToken } from '../../services/authService';
import * as ROUTES from '../../constants/routes';
import AuthContext from '../ContextApi/Auth/AuthContext';
import PublicRoute from '../routes/PublicRoute';
import PrivateRoute from '../routes/PrivateRoute';
import Landing from '../Landing';
import Signup from '../SignUp';
import Signin from '../SignIn';
import Dashboard from '../Dashboard';
import Project from '../Project';
import Bugs from '../Bug';
import BugGallery from '../Bug/bugGallery';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlus,
  faTachometerAlt,
  faFolder,
  faEraser,
  faImage,
  faPowerOff,
  faTrash,
  faEdit,
  faTasks,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { SET_AUTH_USER } from '../../constants/action_type';
library.add({
  faPlus,
  faTachometerAlt,
  faFolder,
  faEraser,
  faImage,
  faPowerOff,
  faTrash,
  faEdit,
  faTasks,
  faUser,
});

function App() {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    if (localStorage.access_token) {
      verifyToken()
        .then((response) => {
          authContext.dispatch({ type: 'TOGGLE_AUTHENTICATED', payload: true });
          authContext.dispatch({ type: SET_AUTH_USER, payload: response.data });
        })
        .catch(() => {
          authContext.dispatch({
            type: 'TOGGLE_AUTHENTICATED',
            payload: false,
          });
        });
    }
  }, []);
  return (
    <div className='App'>
      <ThemProvider>
        <ProjectProvider>
          <BugProvider>
            <Router>
              <PublicRoute exact path={'/'} component={Landing} />
              <PublicRoute exact path={ROUTES.SIGN_IN} component={Signin} />
              <PublicRoute exact path={ROUTES.SIGN_UP} component={Signup} />
              <PrivateRoute
                exact
                path={ROUTES.DASHBOARD}
                component={Dashboard}
              />
              <PrivateRoute exact path={ROUTES.PROJECTS} component={Project} />
              <PrivateRoute exact path={ROUTES.BUGS} component={Bugs} />
              <PrivateRoute
                exact
                path={ROUTES.BUGS_GALLERY}
                component={BugGallery}
              />
            </Router>
          </BugProvider>
        </ProjectProvider>
      </ThemProvider>
    </div>
  );
}

export default App;
