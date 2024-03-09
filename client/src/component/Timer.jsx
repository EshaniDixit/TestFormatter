import React, { useEffect, useState } from "react";
import "./Timer.css";

const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  const handleScroll = (event, setter, max) => {
    const delta = Math.sign(event.deltaY);
    setter((prev) => {
      let newValue = prev + delta;
      if (newValue < 0) {
        newValue = max;
      } else if (newValue > max) {
        newValue = 0;
      }
      return newValue;
    });
  };

  const startTimer = () => {
    if (!timerRunning) {
      setTimerRunning(true);
    }
  };

  useEffect(() => {
    let intervalId;

    if (timerRunning) {
      intervalId = setInterval(() => {
        if (seconds === 0 && minutes === 0 && hours === 0) {
          clearInterval(intervalId);
          setTimerRunning(false);
        } else {
          if (seconds === 0) {
            if (minutes === 0) {
              setHours((prev) => prev - 1);
              setMinutes(59);
              setSeconds(59);
            } else {
              setMinutes((prev) => prev - 1);
              setSeconds(59);
            }
          } else {
            setSeconds((prev) => prev - 1);
          }
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timerRunning, hours, minutes, seconds]);

  return (
    <div className="timer-container">
      <div className="timer-values">
        <div className="timer-value" onWheel={(e) => handleScroll(e, setHours, 23)}>
          <p className="big-text">{hours < 10 ? `0${hours}` : hours}</p>
          <span>hours</span>
        </div>
        <div className="timer-value" onWheel={(e) => handleScroll(e, setMinutes, 59)}>
          <p className="big-text">{minutes < 10 ? `0${minutes}` : minutes}</p>
          <span>mins</span>
        </div>
        <div className="timer-value" onWheel={(e) => handleScroll(e, setSeconds, 59)}>
          <p className="big-text">{seconds < 10 ? `0${seconds}` : seconds}</p>
          <span>seconds</span>
        </div>
      </div>
      <button className="timer-button" onClick={startTimer}>Start</button>
    </div>
  );
};

export default Timer;
