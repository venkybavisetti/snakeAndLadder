import React from 'react';
import player from '../images/gamePlayer.png';

const Square = ({ value }) => {
  let players = [];
  for (let index = 0; index < value.length; index++) {
    players.push(
      <img
        key={index}
        src={player}
        alt="player"
        style={{
          height: 70 / Math.ceil(value.length / 2),
          filter: `hue-rotate(${value[index].hue}deg)`,
        }}
      />
    );
  }

  return (
    <div className="square pure-u-1-6">
      <div className="players">{players}</div>
    </div>
  );
};

export default Square;
