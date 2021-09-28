import React from 'react';
import { Card } from 'react-bootstrap';

function BoardCard(props) {
  const { label = [] } = props;
  return (
    <Card style={{ width: '100%', margin: 10, backgroundColor: '#dfdce5ff' }}>
      <Card.Header
        style={{
          backgroundColor: ' #dfdce5ff',
          borderBottom: 0,
        }}
      >
        <div className='d-flex w-100 justify-content-between'>
          <div>
            <span>
              <h5>Title</h5>
            </span>
            {props.title}
          </div>
          <div>
            <span className='text-danger'>
              <h5>Priority:</h5>
            </span>
            {props.priority}
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <div className='d-flex w-100 justify-content-between'>
            <div>
              <span className='text-danger'>
                <div>DeadLine:</div>
              </span>
              {props.description}
            </div>
            <div>
              <span>
                <div>Type:</div>
              </span>
              {props.shortDescription}
            </div>
            <div>
              <span>
                <div>Status:</div>
              </span>
              {props.status}
            </div>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default BoardCard;
