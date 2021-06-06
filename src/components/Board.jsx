import React, { useState } from 'react';
import Table from './Table';
import PlayerList from './PlayerList';
import playerImg from '../images/gamePlayer.png';
import Dices from './Dices';

const PlayerData = [
  { name: 'ravashna', hue: 18 },
  { name: 'ram', hue: 60 },
  { name: 'ram', hue: 60 },
  { name: 'ram', hue: 60 },
  { name: 'ram', hue: 60 },
  { name: 'ram', hue: 60 },
  { name: 'ram', hue: 60 },
  { name: 'ram', hue: 60 },
  { name: 'ram', hue: 60 },
  { name: 'ram', hue: 60 },
  { name: 'ram', hue: 60 },
];

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

  const getWalletSquareSide = () => {
    if (PlayerData.length < 9) return 74;
    return 280 / Math.ceil(PlayerData.length / 2);
  };

  return (
    <div>
      <div className="board-status">Status</div>
      <div className="dash-board">
        <PlayerList header={'Participants'} />
        <div className="page">
          <div className="player-wallet">
            <div className="player-wallet-box">
              {PlayerData.map((player, index) => (
                <div
                  key={index}
                  style={{
                    height: getWalletSquareSide(),
                    width: 74,
                  }}
                  className="square pure-u-1-6"
                >
                  <div className="players">
                    <img
                      src={playerImg}
                      alt="player"
                      style={{
                        height: 70,
                        filter: `hue-rotate(${player.hue}deg)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Table cellMatrix={data} onClick={handleCellClick} />
        </div>
        <PlayerList header="Winners" />
      </div>
      <div className="dices">
        <Dices />
      </div>
    </div>
  );
};

export default Board;
