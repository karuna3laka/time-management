import { useTimer } from '../../hooks/useTimer';
import { formatTime } from '../../utils/formatTime';
import './Timer.css';

export function Timer({ activeTask, onStart, onStop }) {
  const { elapsedTime, isRunning, start, stop } = useTimer();

  const handleStart = () => {
    start();
    onStart();
  };

  const handleStop = () => {
    stop();
    onStop();
  };

  return (
    <div className="timer-display">
      <span className="time">{formatTime(elapsedTime)}</span>
      
      {isRunning ? (
        <button className="timer-button stop" onClick={handleStop}>
          Stop Timer
        </button>
      ) : (
        <button 
          className="timer-button start" 
          onClick={handleStart}
          disabled={!activeTask}
        >
          Start Timer
        </button>
      )}
    </div>
  );
}