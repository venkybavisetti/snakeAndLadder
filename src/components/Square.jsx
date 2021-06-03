import React from 'react';
import player from '../images/player.png';

const Square = ({ onClick, rowId, cellId, dimension, value }) => {
  let players = [];
  for (let index = 0; index < value; index++) {
    players.push(
      <img
        key={index}
        src={player}
        alt="player"
        style={{ height: 75 / Math.ceil(value / 2) }}
      />
    );
  }

  return (
    <div
      className="square pure-u-1-6"
      style={{ height: 750 / dimension }}
      onClick={() => onClick(rowId, cellId)}
    >
      <div className="players">{players}</div>
    </div>
  );
};

export default Square;
