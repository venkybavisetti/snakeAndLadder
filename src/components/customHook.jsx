import { useState, useEffect } from 'react';
import { api } from './api';

const useTimer = (action, timeToFetch = 10) => {
  const [match, setMatch] = useState({});
  useEffect(() => {
    api(action).then(setMatch);
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
