import Axios from '../helpers/setAxiosDefault';
import { DELETE_PROJECT } from '../constants/action_type';

function getProjects() {
  return new Promise((resolve, reject) => {
    Axios.get('/projects')
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
}

function addProject(payload) {
  return new Promise((resolve, reject) => {
    Axios.post('/projects', payload)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
}

function updateProject(id, payload) {
  return new Promise((resolve, reject) => {
    Axios.put(`/projects/${id}`, payload)
      .then((response) => {
        resolve(payload);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
}

function assignProjectDetails() {
  return new Promise((resolve, reject) => {
    Axios.get('assign/project-user')
      .then((response) => {
        const { data } = response.data;
        const _data = data.filter((_f) => _f !== null);
        resolve(_data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
}

function assignedUserProject(payload) {
  return new Promise((resolve, reject) => {
    Axios.post('/assign/project', payload)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
}

function getAssignProject() {
  return new Promise((resolve, reject) => {
    Axios.get('/assign/projects')
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
}

function removeAssignUserProject(id) {
  return new Promise((resolve, reject) => {
    Axios.delete(`/assign-project/${id}`)
      .then((response) => {
        resolve();
      })
      .catch((error) => {
        reject(error.response);
      });
  });
}

function projectDelete(id) {
  return new Promise((resolve, reject) => {
    Axios.delete(`projects/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
}

function searchProject(payload) {
  return new Promise((resolve, reject) => {
    Axios.post('/projects/search', payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
}

export {
  getProjects,
  addProject,
  updateProject,
  assignedUserProject,
  getAssignProject,
  assignProjectDetails,
  removeAssignUserProject,
  projectDelete,
  searchProject,
};
