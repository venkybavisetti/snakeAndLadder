import React from 'react';
import Row from './Row';

const Table = ({ cellMatrix, onClick }) => {
  let rows = [];
  for (let i = 0; i < cellMatrix.length; i++) {
    rows.push(
      <Row cellArray={cellMatrix[i]} id={i} key={i} onClick={onClick} />
    );
  }

  return <div className="board">{rows}</div>;
};

export default Table;
