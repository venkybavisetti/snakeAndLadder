import React from 'react';
import { PlayerImg } from './util';

const Player = ({ playerData, currentPlayer, isHost }) => {
  return (
    <div
      className={`player ${
        playerData.playerId === currentPlayer ? 'activePlayer' : ''
      }`}
    >
      <PlayerImg
        {...{
          height: 35,
          player: playerData.player,
        }}
      />
      <div>{playerData.name}</div>
    </div>
  );
};

const PlayerList = ({ header, players, currentPlayer, isHost }) => {
  return (
    <div className="player-list-container">
      <h3>{header}</h3>
      {players.map((playerData, index) => (
        <Player
          key={index}
          playerData={playerData}
          currentPlayer={currentPlayer}
          isHost={isHost}
        />
      ))}
    </div>
  );
};

export default PlayerList;
