import React, { useState, useEffect } from 'react';
import player from '../images/gamePlayer.png';
import { api } from './api';
import { useHistory } from 'react-router-dom';

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
    <div className="player-info">
      <div>{roomId}</div>
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
            <div
              key={index}
              className={`selected-img ${hueValue === value ? 'selected' : ''}`}
              onClick={() => setHueValue(value)}
            >
              <img
                src={player}
                alt="player"
                style={{ height: 35, filter: `hue-rotate(${value}deg)` }}
              />
            </div>
          );
        })}
      </div>
      {errorMsg && <div>Please select different color</div>}
      <button
        disabled={!(playerName.trim() && hueValue)}
        type="submit"
        onClick={handleJoin}
      >
        join
      </button>
    </div>
  );
};

export default PlayerInfo;
