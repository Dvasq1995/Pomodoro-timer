import React, { useState } from 'react';
import * as timer from '../utils/duration/index';
import classNames from '../utils/class-names';
import useInterval from '../utils/useInterval';

function Timer({
  workDuration,
  breakDuration,
  isTimerRunning,
  setIsTimerRunning,
}) {
  const [minutesWork, setMinutesWork] = useState(0);
  const [minutesBreak, setMinutesBreak] = useState(0);
  const [currentTimer, setCurrentTimer] = useState(true);
  const [secondsWork, setSecondsWork] = useState(0);
  const [secondsBreak, setSecondsBreak] = useState(0);
  const [session, setSession] = useState(false);
  const [ariaVal, setAriaVal] = useState(0);

  useInterval(
    () => {
      if (session) {
        if (ariaVal < 100) {
          setAriaVal((ariaVal) => ariaVal + 100 / workDuration / 60);
        }
        if (minutesWork === 0 && secondsWork === 0) {
          setCurrentTimer((currentTimer) => !currentTimer);
          setMinutesWork(workDuration);
          setSecondsWork(0);
          setAriaVal(0);
          new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
        }

        if (minutesBreak === 0 && secondsBreak === 0) {
          setCurrentTimer((currentTimer) => !currentTimer);
          setMinutesBreak(breakDuration);
          setSecondsBreak(0);
          setAriaVal(0);
          new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
        }
        if (currentTimer === true) {
          if (secondsWork !== 0) {
            setSecondsWork((secondsWork) => secondsWork - 1);
          } else {
            setSecondsWork(59);
            setMinutesWork((minutesWork) => minutesWork - 1);
          }
        } else if (currentTimer === false) {
          if (ariaVal < 100) {
            setAriaVal((ariaVal) => ariaVal + 100 / breakDuration / 60);
          }
          if (secondsBreak !== 0) {
            setSecondsBreak((secondsWork) => secondsWork - 1);
          } else {
            setSecondsBreak(59);
            setMinutesBreak((minutesBreak) => minutesBreak - 1);
          }
        }
      }
    },
    isTimerRunning ? 1000 : null,
  );

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
  }

  return (
    <div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={() => {
                if (session === false) {
                  setSession((session) => !session);
                  setMinutesWork(workDuration);
                  setSecondsWork(0);
                  setMinutesBreak(breakDuration);
                  setSecondsWork(0);
                }
                playPause();
                setCurrentTimer(true);
              }}
            >
              <span
                className={classNames({
                  oi: true,
                  'oi-media-play': !isTimerRunning,
                  'oi-media-pause': isTimerRunning,
                })}
              />
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              onClick={() => {
                setMinutesWork(0);
                setSecondsWork(0);
                setMinutesBreak(0);
                setSecondsBreak(0);
                setSession(false);
                setIsTimerRunning(false);
                setAriaVal(0);
              }}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>

      {session ? (
        <div>
          {' '}
          <div className="row mb-2">
            <div className="col">
              {currentTimer === true ? (
                <div>
                  <h2 data-testid="session-title">
                    Focusing for {timer.minutesToDuration(workDuration)} minutes
                  </h2>
                  <p className="lead" data-testid="session-sub-title">
                    {minutesWork}:
                    {secondsWork === 0 ? `${secondsWork}0` : secondsWork}{' '}
                    remaining
                  </p>
                </div>
              ) : (
                <div>
                  <h2 data-testid="session-title">
                    On Break for {timer.minutesToDuration(breakDuration)}{' '}
                    minutes
                  </h2>
                  <p className="lead" data-testid="session-sub-title">
                    {minutesBreak}:
                    {secondsBreak === 0 ? `${secondsBreak}0` : secondsBreak}{' '}
                    remaining
                  </p>
                </div>
              )}
              {isTimerRunning === false ? <p>PAUSED</p> : null}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <div className="progress" style={{ height: '20px' }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow={ariaVal}
                  style={{ width: `${ariaVal}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Timer;
