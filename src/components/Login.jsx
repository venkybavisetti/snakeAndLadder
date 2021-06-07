import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from './api';
import { Button, TextField } from '@material-ui/core';

const Login = () => {
  const [join, setJoin] = useState(false);
  const [text, setText] = useState('');
  const history = useHistory();

  const handleCreateRoom = () => {
    setJoin(false);
    setText('');
    api({ type: 'create-room' }).then(() => history.push('/player-info'));
  };

  const handleJoin = () => {
    api({ type: 'join-room', data: { roomId: +text } }).then(() =>
      history.push('/player-info')
    );
  };

  return (
    <div className="loginPage">
      <div className="login">
        <div className="login-buttons">
          <Button
            className={join ? 'login-buttons-active' : ''}
            variant="contained"
            color="primary"
            onClick={() => {
              setJoin(true);
            }}
          >
            Join Room
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCreateRoom}
          >
            Create Room
          </Button>
        </div>

        {join && (
          <>
            <div className="login-room-id login-row">
              <label>Enter Room Id :</label>
              <TextField
                id="standard-number"
                type="number"
                onChange={(event) => setText(event.target.value)}
                value={text}
              />
            </div>

            <div className="login-row">
              <Button
                disabled={!(text.trim() !== '') || !(text >= 1)}
                variant="contained"
                color="primary"
                onClick={handleJoin}
              >
                Join Game
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
