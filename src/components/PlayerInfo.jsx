import React, { useState, useEffect } from 'react';
import player from '../images/gamePlayer.png';
import { api } from './api';
import { useHistory } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';

const PlayerInfo = () => {
  const [playerName, setPlayerName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [data, setData] = useState([]);
  const [hueValue, setHueValue] = useState(undefined);
  const [errorMsg, setErrorMsg] = useState(false);

  const history = useHistory();

  useEffect(() => {
    api({ type: 'roomId' }).then((data) => setRoomId(data.roomId));
    api({ type: 'player-colors' }).then(setData);
  }, []);

  const handleJoin = () => {
    api({ type: 'join', data: { playerName, hueValue } }).then(
      ({ status, data }) => {
        if (status) history.push('/board');
        else {
          setErrorMsg(true);
          setData(data);
        }
      }
    );
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
                    hueValue === value ? 'selected' : ''
                  }`}
                  onClick={() => setHueValue(value)}
                >
                  <img
                    src={player}
                    alt="player"
                    style={{ height: 50, filter: `hue-rotate(${value}deg)` }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {errorMsg && <div>Please select different color</div>}
        <div className="join-room-btn">
          <Button
            disabled={!(playerName.trim() && hueValue)}
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
