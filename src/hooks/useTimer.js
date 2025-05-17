import { useState, useEffect } from 'react';

export function useTimer(initialState = false) {
  const [isRunning, setIsRunning] = useState(initialState);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  return { elapsedTime, isRunning, start, stop, reset };
}