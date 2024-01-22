import React, { useState, useEffect } from 'react';


const CountdownTimer = () => {
  const [initialTime, setInitialTime] = useState(300); // Initial countdown time in seconds (5 minutes)
  const [countdownTime, setCountdownTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning && countdownTime > 0) {
      timer = setInterval(() => {
        setCountdownTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (countdownTime === 0) {
      clearInterval(timer);
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, countdownTime]);

  const handleTimeChange = (e) => {
    const newTime = parseInt(e.target.value, 10);
    setInitialTime(newTime);
    setCountdownTime(newTime);
  };

  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className='sty'>
      <h2>Countdown <span>Timer</span> </h2>

      <div>
        <label htmlFor="timerInput"> Set Timer (seconds): </label>
        <input
          type="number"
          id="timerInput"
          value={initialTime}
          onChange={handleTimeChange}
          disabled={isRunning}
        />
      </div>
      <div>
        <p id='size'>Current Time: {formatTime(countdownTime)}</p>
        <button onClick={handleStartStop} id='m'>{isRunning ? 'Stop' : 'Start'}</button>
      
      </div>
    </div>
  );
};

export default CountdownTimer;
