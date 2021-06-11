const postReq = (url, data) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((data) => {
      const response = data.json();
      if (data.status === 403) {
        reject(response);
        return;
      }
      resolve(response);
    });
  });
};

const getReq = (url) => {
  return new Promise((resolve, reject) => {
    return fetch(url).then((data) => {
      const response = data.json();
      if (data.status === 403) {
        reject(response);
        return;
      }
      resolve(response);
    });
  });
};

const api = (action) => {
  switch (action.type) {
    case 'create-room':
      return postReq('/api/createRoom', {});
    case 'join-room':
      return postReq('/api/joinRoom', action.data);
    case 'join':
      return postReq('/api/join', action.data);
    case 'start':
      return postReq('/api/start', {});
    case 'dice':
      return postReq('/api/dice', action.data);
    case 'change-host':
      return postReq('/api/changeHost', action.data);
    case 'remove-player':
      return postReq('/api/removePlayer', action.data);

    case 'roomId':
      return getReq('/api/roomId');
    case 'player-colors':
      return getReq('/api/playerColors');
    case 'board-data':
      return getReq('/api/boardData');

    default:
      return new Promise((_res, reject) => reject());
  }
};

export { api };
