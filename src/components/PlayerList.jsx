import React from 'react';
import player from '../images/gamePlayer.png';

const Player = ({ playerData }) => {
  return (
    <div className="player">
      <img
        src={player}
        alt="player"
        style={{ height: 35, filter: `hue-rotate(${playerData.hue}deg)` }}
      />
      <div>{playerData.name}</div>
    </div>
  );
};

const PlayerList = ({ header, players }) => {
  return (
    <div>
      <div className="player-list-header">{header}</div>
      <div className="player-list">
        {players.map((playerData, index) => (
          <Player key={index} playerData={playerData} />
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
