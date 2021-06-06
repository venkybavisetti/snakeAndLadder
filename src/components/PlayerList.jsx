import React, { useState } from 'react';
import player from '../images/gamePlayer.png';

const data = [
  { name: 'ravashna', hue: 18 },
  { name: 'ram', hue: 60 },
];

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

const PlayerList = ({ header }) => {
  const players = data.map((playerData, index) => (
    <Player key={index} playerData={playerData} />
  ));
  return (
    <div>
      <div className="player-list-header">{header}</div>
      <div className="player-list">{players}</div>
    </div>
  );
};

export default PlayerList;
