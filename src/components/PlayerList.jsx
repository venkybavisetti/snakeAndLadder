import React from 'react';
import { PlayerImg } from './util';

const Player = ({ playerData, currentPlayer }) => {
  return (
    <div
      className={`player ${
        currentPlayer &&
        playerData.player.playerNum === currentPlayer.playerNum &&
        playerData.player.hue === currentPlayer.hue
          ? 'activePlayer'
          : ''
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

const PlayerList = ({ header, players, currentPlayer }) => {
  console.log(players, currentPlayer);
  return (
    <div className="player-list-container">
      <h3>{header}</h3>
      {players.map((playerData, index) => (
        <Player
          key={index}
          playerData={playerData}
          currentPlayer={currentPlayer}
        />
      ))}
    </div>
  );
};

export default PlayerList;
