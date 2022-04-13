import './App.css';

import React,  { useState, useRef, useEffect } from 'react'

const WATCH_STATES = {
  READY: 'READY',
  START: 'START',
  RUNNING: 'RUNNING',
  RESUME: 'RESUME',
  STOPPED: 'STOPPED',
}

function App() {
  const [count, setCount] = useState(0)
  const [watchState, setWatchState] = useState(WATCH_STATES.READY)
  const [history, setHistory] = useState([])

  const requestRef = React.useRef();
  const previousTimeRef = React.useRef(0);

  const animate = time => {

    switch(watchState) {
      case WATCH_STATES.RUNNING:
        const deltaTime = time - previousTimeRef.current
        setCount(prevCount => prevCount + deltaTime)
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
        break

      case WATCH_STATES.START:
      case WATCH_STATES.RESUME:
        setWatchState(WATCH_STATES.RUNNING)
        previousTimeRef.current = time;
        break
    }
  }

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef.current);
  }, [watchState]);

  const destructTime = (time) => ({
    milisec: Math.round(time % 1000),
    sec: Math.round(time / 1000) % 60,
    min: Math.round(time / 60000) % 60
  })

  const handleStart = () => {
    setWatchState(WATCH_STATES.START)
  }

  const handleReset = () => {
    setHistory([])
    setWatchState(WATCH_STATES.READY)
    setCount(0)
  }

  const handleStop = () => {
    setWatchState(WATCH_STATES.STOPPED)
  }

  const handleResume = () => {
    setWatchState(WATCH_STATES.RESUME)
  }

  const handleLap = () => {
    const { min, sec, milisec } = destructTime(count)
    setHistory([`${min}, ${sec}, ${milisec}`, ...history].slice(0,10))
  }

  const { min, sec, milisec } = destructTime(count)

  return (
    <div>
      <div>{min}, {sec}, {milisec}</div>

      { watchState === WATCH_STATES.READY && <div onClick={handleStart}>Start</div> }
      { watchState === WATCH_STATES.RUNNING &&
        <>
          <div onClick={handleStop}>Stop</div>
          <div onClick={handleLap}>Lap</div>
        </>
      }
      { watchState === WATCH_STATES.STOPPED &&
        <>
          <div onClick={handleReset}>Reset</div>
          <div onClick={handleResume}>Resume</div>
        </>
      }

      <ul>
        {history.map(time =>
          <li key={time}>{time}</li>
        )}
      </ul>

      <div>{watchState}</div>
    </div>
  )
}

export default App;
