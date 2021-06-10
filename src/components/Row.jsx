import React from 'react';
import Square from './Square';

const Row = ({ id, cellArray, currentPlayerId }) => {
  let cells = [];
  for (let i = 0; i < cellArray.length; i++) {
    cells.push(
      <Square value={cellArray[i]} key={i} currentPlayerId={currentPlayerId} />
    );
  }

  return <div className={id % 2 === 1 ? 'row-reverse' : ''}>{cells}</div>;
};

export default Row;
