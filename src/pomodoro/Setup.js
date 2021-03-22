import React, { useState } from 'react';
import * as timer from '../utils/duration/index';
import Timer from './Timer';

function Setup() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  function changeTimer(symbol, type) {
    if (isTimerRunning === false) {
      if (type === 'work') {
        if (symbol === '+') {
          setWorkDuration((workDuration) => workDuration + 5);
          return timer.minutesToDuration(workDuration);
        }
        setWorkDuration((workDuration) => workDuration - 5);
        return timer.minutesToDuration(workDuration);
      } else if (type === 'break') {
        if (symbol === '+') {
          setBreakDuration((breakDuration) => breakDuration + 1);
          return timer.minutesToDuration(breakDuration);
        }
        setBreakDuration((breakDuration) => breakDuration - 1);
        return timer.minutesToDuration(breakDuration);
      }
    }
  }
  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              Focus Duration: {timer.minutesToDuration(workDuration)}
            </span>
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick={() => {
                  if (workDuration > 5) {
                    changeTimer('-', 'work');
                  } else {
                    return null;
                  }
                }}
              >
                <span className="oi oi-minus" />
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick={() => {
                  if (workDuration < 60) {
                    changeTimer('+', 'work');
                  } else {
                    return null;
                  }
                }}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                Break Duration: {timer.minutesToDuration(breakDuration)}
              </span>
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick={() => {
                    if (breakDuration > 1) {
                      changeTimer('-', 'break');
                    }
                  }}
                >
                  <span className="oi oi-minus" />
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={() => {
                    if (breakDuration < 15) {
                      changeTimer('+', 'break');
                    }
                  }}
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Timer
        workDuration={workDuration}
        breakDuration={breakDuration}
        isTimerRunning={isTimerRunning}
        setIsTimerRunning={setIsTimerRunning}
      />
    </div>
  );
}

export default Setup;
