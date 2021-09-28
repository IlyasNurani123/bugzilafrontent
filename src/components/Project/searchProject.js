import React, { useState, useContext } from 'react';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import ProjectContext from '../ContextApi/project/ProjectContext';
import { searchProject } from '../../services/projectServices';
import { SEARCH_PROJECT } from '../../constants/action_type';

function SearchProject() {
  const [search, setSerach] = useState({
    name: '',
  });

  const projectContext = useContext(ProjectContext);

  const { project } = projectContext.state;
  function handleOnChange(e) {
    setSerach({ ...search, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log('this is setstate', search);
    searchProject(search)
      .then((response) => {
        projectContext.dispatch({
          type: SEARCH_PROJECT,
          payload: response,
        });
      })
      .catch((error) => {
        console.log('there are some error ', error);
      });
  }

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Row>
          <Col md='8' lg='8'>
            <Form.Group controlId='formGridCity'>
              <Form.Control
                type='text'
                name='name'
                onChange={handleOnChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Button type='onClick' size='sm'>
              search
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default SearchProject;
