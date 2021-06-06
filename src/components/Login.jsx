import React, { useState } from 'react';

const Login = () => {
  const [join, setJoin] = useState(false);
  const [text, setText] = useState('');

  const handleCreateRoom = () => {
    setJoin(false);
    setText('');
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
          {text.trim() !== '' && <button>start</button>}
        </div>
      )}
    </div>
  );
};

export default Login;
