import React from 'react';
import Row from './Row';

const Table = ({ table, currentPlayerId }) => {
  let rows = [];
  for (let i = 0; i < table.length; i++) {
    rows.push(
      <Row
        cellArray={table[i]}
        id={i}
        key={i}
        currentPlayerId={currentPlayerId}
      />
    );
  }

  return (
    <div className="table">
      <div className="board">{rows}</div>
    </div>
  );
};

export default Table;
