import Axios from '../helpers/setAxiosDefault';

function getBugs() {
  return new Promise((resolve, reject) => {
    Axios.get('/bugs')
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
}

const config = {
  headers: { 'content-type': 'multipart/form-data' },
};
function addBug(payload, config) {
  return new Promise((resolve, reject) => {
    Axios.post('/bugs', payload, config)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
}

function assignBug(payload, id) {
  return new Promise((resolve, reject) => {
    Axios.put(`/assign-bug/${id}`, payload)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
}

function removeAssignBug(id) {
  return new Promise((resolve, reject) => {
    Axios.put(`/remove-assign-bug/${id}`)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
}

function bugDelete(id) {
  return new Promise((resolve, reject) => {
    Axios.delete(`/bugs/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
}

function bugImages() {
  return new Promise((resolve, reject) => {
    Axios.get('/bugs/bugsImages')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
}

function searchBug(payload) {
  return new Promise((resolve, reject) => {
    Axios.post('/bugs/search', payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
}

function getBugImages() {
  return new Promise((resolve, reject) => {
    Axios.get('/bug-images')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
}
export {
  getBugs,
  addBug,
  assignBug,
  removeAssignBug,
  bugDelete,
  bugImages,
  searchBug,
  getBugImages,
};
