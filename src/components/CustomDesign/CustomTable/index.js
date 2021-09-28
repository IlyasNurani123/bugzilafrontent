import React from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import './style.css';
function CustomTable(props) {
  const { tableHead = [] } = props;
  return (
    <Table>
      <thead>
        {tableHead.map((th, id) => (
          <th key={`th-${id}`}>{th}</th>
        ))}
      </thead>
      <tbody>{props.children}</tbody>
    </Table>
  );
}

export default CustomTable;
