import './App.css';

import React,  { useState, useRef, useEffect } from 'react'

const padToNDigits = (nDigits) => (num) => num.toString().padStart(nDigits, '0')

const formatTime = milliseconds => {
  const ms = Math.floor(milliseconds % 1000)
  const seconds = Math.floor(milliseconds / 1000) % 60
  const minutes = Math.floor(milliseconds / (60 * 1000)) % 60
  const hours = Math.floor(milliseconds / (60 * 60 * 1000)) % 24

  return `${padToNDigits(2)(hours)}:${padToNDigits(2)(minutes)}:${padToNDigits(2)(seconds)}.${padToNDigits(3)(ms)}`
}

const Duration = ({ ms }) => <div>{formatTime(ms)}</div>


const StopWatchInitial = ({ requestStart }) => (
  <section>
    <h4>Initial</h4>
    <Duration ms={0} />
    <footer>
      <button onClick={requestStart}>Start</button>
    </footer>
  </section>
)

const StopWatchRunning = ({ ms, requestLap, requestStop }) => (
  <section>
    <h4>Running...</h4>
    <Duration ms={ms} />
    <footer>
      <button onClick={requestStop}>Stop</button>
      <button onClick={requestLap}>Lap</button>
    </footer>
  </section>
)

const StopWatchStopped = ({ ms, requestReset, requestResume }) => (
  <section>
    <h4>Stopped</h4>
    <Duration ms={ms} />
    <footer>
      <button onClick={requestReset}>Reset</button>
      <button onClick={requestResume}>Resume</button>
    </footer>
  </section>
)

const Hitory = ({ items }) => (
  <ul>
    {items.map(item => <li key={item}>{item}</li>)}
  </ul>
)

function App() {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [isPausing, setIsPausing] = useState(false)
  const [historyList, setHistoryList] = useState([])

  const requestRef = useRef()
  const previousTimeRef = useRef(0)

  const animate = time => {
    switch(true) {
      case !hasStarted:
        previousTimeRef.current = time
        break

      case hasStarted && !isPausing:
        const deltaTime = time - previousTimeRef.current
        setCount(prevCount => prevCount + deltaTime)
        previousTimeRef.current = time
        requestRef.current = requestAnimationFrame(animate)
        break

      case hasStarted && isPausing:
        previousTimeRef.current = time
        requestRef.current = requestAnimationFrame(animate)
        break
    }
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(requestRef.current)
  }, [hasStarted, isPausing])

  const handleStart = () => {
    setHasStarted(true)
  }

  const handleReset = () => {
    setHistoryList([])
    setHasStarted(false)
    setIsPausing(false)
    setCount(0)
  }

  const handleStop = () => {
    setIsPausing(true)
  }

  const handleResume = () => {
    setIsPausing(false)
  }

  const handleLap = () => {
    setHistoryList([formatTime(count), ...historyList].slice(0,10))
  }

  return (
    <div>
      { !hasStarted && <StopWatchInitial requestStart={handleStart} /> }

      { hasStarted && !isPausing && <StopWatchRunning ms={count} requestLap={handleLap} requestStop={handleStop} /> }

      { hasStarted && isPausing && <StopWatchStopped ms={count} requestReset={handleReset} requestResume={handleResume} /> }

      <Hitory items={historyList}/>
    </div>
  )
}

export default App;
