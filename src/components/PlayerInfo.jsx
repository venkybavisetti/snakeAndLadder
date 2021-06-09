import React, { useState, useEffect } from 'react';
import { api } from './api';
import { useHistory } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { PlayerImg } from './util';

const PlayerInfo = () => {
  const [playerName, setPlayerName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [data, setData] = useState([]);
  const [player, setPlayer] = useState(undefined);
  const [errorMsg, setErrorMsg] = useState(false);

  const history = useHistory();

  useEffect(() => {
    api({ type: 'roomId' }).then((data) => setRoomId(data.roomId));
    api({ type: 'player-colors' }).then(setData);
  }, []);

  const handleJoin = () => {
    api({ type: 'join', data: { playerName, player } })
      .then(({ status, data }) => {
        if (status) history.push('/board');
        else {
          setErrorMsg(true);
          setData(data);
          setPlayer(undefined);
        }
      })
      .catch((error) => history.push('/'));
  };

  return (
    <div className="loginPage">
      <div className="player-info">
        <h1 style={{ textAlign: 'center' }}>
          Room Id:
          {roomId}
        </h1>
        <div className="board-status">
          <h3>Player Name: </h3>
          <TextField
            id="standard-basic"
            value={playerName}
            onChange={(event) => {
              setPlayerName(event.target.value);
            }}
          />
        </div>
        <div className="player-color">
          <h3>Select Color: </h3>
          <div className="player-img">
            {data.map((value, index) => {
              return (
                <div
                  key={index}
                  className={`selected-img ${
                    player &&
                    player.hue === value.hue &&
                    player.playerNum === value.playerNum
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() => setPlayer(value)}
                >
                  <PlayerImg
                    {...{
                      height: 50,
                      player: value,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {errorMsg && (
          <div style={{ color: 'red', fontWeight: 600 }}>
            Please select different color
          </div>
        )}
        <div className="join-room-btn">
          <Button
            disabled={!(playerName.trim() && player)}
            onClick={handleJoin}
            variant="contained"
            color="primary"
          >
            Join Room
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;
