import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [targetDate, setTargetDate] = useState('');
  const [countdown, setCountdown] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [countdownOver, setCountdownOver] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const initialTimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
    setTimeLeft(initialTimeLeft);
  }, []); // Run this effect only once when component mounts

  useEffect(() => {
    if (countdown !== null) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdown - now;

        if (distance <= 0) {
          clearInterval(interval);
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          setCountdownOver(true);
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          setTimeLeft({ days, hours, minutes, seconds });
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [countdown]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedDate = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const difference = selectedDate - now;

    if (difference <= 0) {
      alert('Please select a future date and time.');
      return;
    }

    // Check if the difference exceeds 100 days
    const maxDifference = 100 * 24 * 60 * 60 * 1000; // 100 days in milliseconds
    if (difference > maxDifference) {
      setShowWarning(true);
      return;
    }

    setCountdown(selectedDate);
    setCountdownOver(false);
    setShowWarning(false);
  };

  const handleCancel = () => {
    setCountdown(null);
    setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    setCountdownOver(false);
    setShowWarning(false);
  };

  return (
    <div className="App">
      <h1 className="countdown-header">
        <span style={{ color: 'white' }}>Countdown </span> 
        <span style={{ color: '#8f0992' }}>Timer</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="targetDate"> </label>
        <input
          type="datetime-local"
          id="targetDate"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          required
        />
        <button type="submit">Start Timer</button>
      </form>
      <div className="countdown">
        <h2> </h2>
        <div className="countdown-boxes">
          <div className="countdown-box">
            <p>{timeLeft.days}</p>
            <span>Days</span>
          </div>
          <div className="countdown-box">
            <p>{timeLeft.hours}</p>
            <span>Hours</span>
          </div>
          <div className="countdown-box">
            <p>{timeLeft.minutes}</p>
            <span>Minutes</span>
          </div>
          <div className="countdown-box">
            <p>{timeLeft.seconds}</p>
            <span>Seconds</span>
          </div>
        </div>
        {countdown !== null && (
          <button onClick={handleCancel}>Cancel Countdown</button>
        )}
        {countdownOver && (
          <div className="countdown-over-message">
            <p>The countdown is over, what is your next adventure?</p>
          </div>
        )}
        {showWarning && (
          <div className="warning">
            <p>Selected time is more than 100 days!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;