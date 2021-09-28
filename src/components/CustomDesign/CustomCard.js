import React from 'react';

import { Card } from 'react-bootstrap';

function CustomCard(props) {
  return (
    <Card style={props.Cardstyles} className='custom_card'>
      <Card.Header style={props.cardHeaderStyle}>{props.title}</Card.Header>
      <Card.Body>
        <Card.Text>{props.description}</Card.Text>
        {props.children}
      </Card.Body>
    </Card>
  );
}

export default CustomCard;
