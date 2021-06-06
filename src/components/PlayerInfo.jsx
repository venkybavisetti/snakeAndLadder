import React, { useState } from 'react';
import player from '../images/gamePlayer.png';

const data = [20, 40, 60, 80, 100, 120];

const PlayerInfo = () => {
  const [playerName, setPlayerName] = useState('');

  return (
    <div className="player-info">
      <div className="board-status">
        <div>Player Name: </div>
        <input
          type="text"
          value={playerName}
          onChange={(event) => {
            setPlayerName(event.target.value);
          }}
        />
      </div>
      <div className="player-img">
        {data.map((value, index) => {
          return (
            <img
              key={index}
              src={player}
              alt="player"
              style={{ height: 35, filter: `hue-rotate(${value}deg)` }}
            />
          );
        })}
      </div>
      <button type="submit">join</button>
    </div>
  );
};

export default PlayerInfo;
