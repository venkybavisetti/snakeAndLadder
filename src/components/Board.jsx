import React, { useState } from 'react';
import Table from './Table';

const getInitCells = (dimension) => {
  let rows = [];
  for (let rowIndex = 0; rowIndex < dimension; rowIndex++) {
    rows[rowIndex] = [];

    for (let columnIndex = 0; columnIndex < dimension; columnIndex++) {
      rows[rowIndex][columnIndex] = 0;
    }
  }
  return rows;
};

const Board = () => {
  const [data, setData] = useState(getInitCells(10));

  const handleCellClick = (rowId, cellId) => {
    const cells = [...data];
    cells[rowId][cellId] = cells[rowId][cellId] + 1;

    setData(cells);
  };

  return (
    <div className="page">
      <Table cellMatrix={data} onClick={handleCellClick} />
    </div>
  );
};

export default Board;
