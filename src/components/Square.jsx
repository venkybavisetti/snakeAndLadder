import React from 'react';
import player from '../images/gamePlayer.png';

const Square = ({ onClick, rowId, cellId, dimension, value }) => {
  let players = [];
  for (let index = 0; index < value; index++) {
    players.push(
      <img
        key={index}
        src={player}
        alt="player"
        style={{ height: 70 / Math.ceil(value / 2) }}
      />
    );
  }

  return (
    <div className="square pure-u-1-6" onClick={() => onClick(rowId, cellId)}>
      <div className="players">{players}</div>
    </div>
  );
};

export default Square;
