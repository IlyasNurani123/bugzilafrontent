import React, { useEffect, useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import CustomCard from '../CustomDesign/CustomCard';
import CustomTable from '../CustomDesign/CustomTable/index';
import {
  getAssignProject,
  removeAssignUserProject,
} from '../../services/projectServices';
import ProjectContext from '../ContextApi/project/ProjectContext';
import CustomAlertModal from '../CustomDesign/CustomAlertModal';
import {
  GET_ASSIGN_USER_PROJECT,
  GET_ASSIGN_PROJECT_FAILED,
  REMOVE_ASSIGN_USER_PROJECT,
  REMOVE_ASSIGN_USER_PROJECT_FAILED,
} from '../../constants/action_type';

function AssignProjectList(props) {
  const projectContext = useContext(ProjectContext);

  const [assign, setAssign] = useState({
    assig_id: '',
  });

  const [alertModalShow, setAlertModalShow] = useState(false);

  const onShow = (id) => {
    setAlertModalShow(true);
    setAssign({
      assign_id: id,
    });
  };

  const onClose = () => setAlertModalShow(false);

  const { assignProject = [] } = projectContext.state;

  function removeAssignProject(id) {
    removeAssignUserProject(id)
      .then(() => {
        projectContext.dispatch({
          type: REMOVE_ASSIGN_USER_PROJECT,
          payload: id,
        });

        onClose();
      })
      .catch((error) => {
        projectContext.dispatch({
          type: REMOVE_ASSIGN_USER_PROJECT_FAILED,
          payload: error,
        });
      });
  }

  useEffect(() => {
    getAssignProject()
      .then((response) => {
        projectContext.dispatch({
          type: GET_ASSIGN_USER_PROJECT,
          payload: response,
        });
      })
      .catch((error) => {
        projectContext.dispatch({
          type: GET_ASSIGN_PROJECT_FAILED,
          payload: error,
        });
      });
  }, []);

  return (
    <CustomCard
      cardHeaderStyle={{
        backgroundColor: '#fff',
        borderBottom: 0,
      }}
      Cardstyles={{
        width: '28rem',
        padding: '1rem',
      }}
    >
      <CustomTable tableHead={['Project Name', 'Assign To', 'Action']}>
        {assignProject.map((p, i) => {
          return (
            <tr key={`p-${i}`}>
              <td> {p.project_name}</td>
              <td> {p.user_name}</td>
              <td>
                <CustomAlertModal
                  alertModalShow={alertModalShow}
                  cancelAction={onClose}
                  alertText='Are you sure you want to delete this item?'
                  cancelText='cancel'
                  confirmText='Confirm'
                  confirmedAction={removeAssignProject.bind(this, p.id)}
                />
                <Button
                  size='sm'
                  variant='danger'
                  onClick={onShow.bind(this, p.id)}
                >
                  remove
                </Button>
              </td>
            </tr>
          );
        })}
      </CustomTable>
    </CustomCard>
  );
}

export default AssignProjectList;
