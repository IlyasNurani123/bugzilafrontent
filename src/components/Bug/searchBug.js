import React, { useState, useContext } from 'react';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import { SEARCH_BUG, SEARCH_BUG_FAILED } from '../../constants/action_type';
import { searchBug } from '../../services/bugServices';
import BugContext from '../ContextApi/Bug/BugContext';

function SearchBug() {
  const [search, setSerach] = useState({
    name: '',
  });
  const bugContext = useContext(BugContext);
  function handleOnChange(e) {
    setSerach({ ...search, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    searchBug(search)
      .then((response) => {
        bugContext.dispatch({ type: SEARCH_BUG, payload: response });
        console.log('response', response);
      })
      .catch((error) => {
        bugContext.dispatch({ type: SEARCH_BUG_FAILED, payload: error });
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

export default SearchBug;
