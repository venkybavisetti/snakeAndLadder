import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from './api';

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
    <div>
      <button
        onClick={() => {
          setJoin(true);
        }}
      >
        join
      </button>
      <button onClick={handleCreateRoom}>Create Room</button>
      {join && (
        <div>
          <input
            type="text"
            onChange={(event) => setText(event.target.value)}
            value={text}
          />
          {text.trim() !== '' && <button onClick={handleJoin}>start</button>}
        </div>
      )}
    </div>
  );
};

export default Login;
