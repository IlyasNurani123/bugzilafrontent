import React from 'react';
import './board.css';
import BoardCard from '../BoardCard/BoardCard';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Board(props) {
  const { data = [] } = props;
  return (
    <div className='board-container'>
      <div className='board-header'>
        <div>
          <div>{props.title}</div>
          {/* <Button
            style={{
              width: '100%',
              backgroundColor: '#97B3D0FF',
              border: 'none',
              marginTop: 10,
            }}
          >
            <FontAwesomeIcon icon='plus' size='lg' />
          </Button> */}
        </div>
      </div>
      <div className='board-content'>
        {data.map((f, i) => (
          <BoardCard
            title={f.title}
            priority={f.priority}
            shortDescription={f.type}
            status={f.status}
            description={f.dead_line}
          />
        ))}
      </div>
    </div>
  );
}

export default Board;
