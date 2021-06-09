import { useState, useEffect } from 'react';
import { api } from './api';
import { useHistory } from 'react-router-dom';

const useTimer = (action, timeToFetch = 10) => {
  const [match, setMatch] = useState({});
  const history = useHistory();

  useEffect(() => {
    api(action)
      .then(setMatch)
      .catch(() => history.push('/'));
    const interval = setInterval(
      () => api(action).then(setMatch),
      1000 * timeToFetch
    );
    return () => {
      clearInterval(interval);
    };
  }, [timeToFetch]);

  return match;
};

export { useTimer };
