import Axios from '../helpers/setAxiosDefault';

function login(payload) {
  return new Promise((resolve, reject) => {
    Axios.post('/login', payload)
      .then((response) => {
        // console.log('get accessToken', response.data.access_token);
        localStorage.setItem('access_token', response.data.accessToken);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
}

function register(payload) {
  return new Promise((resolve, reject) => {
    Axios.post('/signup', payload)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        console.log('*** sign up ERROR:', error);
        reject(error.response);
      });
  });
}
function verifyToken() {
  return new Promise((resolve, reject) => {
    Axios.get('/verify-token')
      .then((response) => {
        console.log('response');
        resolve(response);
      })
      .catch((e) => {
        reject(e);
      });
  });
}
function logOut() {
  return new Promise((resolve, reject) => {
    Axios.get('/logout')
      .then(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        resolve();
      })
      .catch((error) => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        reject(error.response);
      });
  });
}

function getUsers() {
  return new Promise((resolve, reject) => {
    Axios.get('/users')
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
}

export { login, register, logOut, verifyToken, getUsers };
