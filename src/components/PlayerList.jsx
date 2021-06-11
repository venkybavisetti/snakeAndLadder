import React, { useState } from 'react';
import { PlayerImg } from './util';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import { BootstrapTooltip } from './util';

const Player = ({
  playerData,
  currentPlayer,
  isHost,
  hostId,
  handlePlayerRemove,
  handleChangeHost,
}) => {
  const [onHover, setOnHover] = useState(false);

  return (
    <div
      className={`player ${
        playerData.playerId === currentPlayer ? 'activePlayer' : ''
      } ${
        isHost && hostId !== playerData.playerId && onHover
          ? 'player-hover'
          : ''
      }`}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      {isHost && onHover && hostId !== playerData.playerId && (
        <div className="host-controls">
          <BootstrapTooltip title="Change Host" placement="top" arrow>
            <TrackChangesIcon
              className="change-host"
              onClick={() => handleChangeHost(playerData.playerId)}
            />
          </BootstrapTooltip>
          <BootstrapTooltip title="Remove Player" placement="top" arrow>
            <RemoveCircleOutlineIcon
              className="remove-player"
              onClick={() => handlePlayerRemove(playerData.playerId)}
            />
          </BootstrapTooltip>
        </div>
      )}
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

const PlayerList = ({
  header,
  players,
  currentPlayer,
  isHost,
  hostId,
  handlePlayerRemove,
  handleChangeHost,
}) => {
  return (
    <div className="player-list-container">
      <h3>{header}</h3>
      {players.map((playerData, index) => (
        <Player
          key={index}
          playerData={playerData}
          currentPlayer={currentPlayer}
          isHost={isHost}
          hostId={hostId}
          handlePlayerRemove={handlePlayerRemove}
          handleChangeHost={handleChangeHost}
        />
      ))}
    </div>
  );
};

export default PlayerList;
