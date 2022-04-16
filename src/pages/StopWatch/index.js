import React,  { useRef, useEffect, useReducer } from 'react'

import StopWatchInitial from './StopWatchInitial'
import StopWatchRunning from './StopWatchRunning'
import StopWatchStopped from './StopWatchStopped'
import History from './History'
import './index.css'

import timeReducer, { initState } from '../../reducers/time'
import { startAction, stopAction, resumeAction, resetAction, lapAction, updateCountAction } from '../../actions'

export default () => {
  const [{ count, hasStarted, isPausing, historyList }, dispatch] = useReducer(timeReducer, initState)

  const requestRef = useRef()
  const previousTimeRef = useRef(0)

  const animate = time => {
    if (hasStarted && !isPausing) {
      const deltaTime = time - previousTimeRef.current
      dispatch(updateCountAction(deltaTime))
    }

    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(requestRef.current)
  }, [hasStarted, isPausing])

  const handleStart = () => dispatch(startAction())

  const handleReset = () => dispatch(resetAction())

  const handleStop = () => dispatch(stopAction())

  const handleResume = () => dispatch(resumeAction())

  const handleLap = () => dispatch(lapAction())

  return (
    <div className="container">
      { !hasStarted && <StopWatchInitial requestStart={handleStart} /> }

      { hasStarted && !isPausing && <StopWatchRunning ms={count} requestLap={handleLap} requestStop={handleStop} /> }

      { hasStarted && isPausing && <StopWatchStopped ms={count} requestReset={handleReset} requestResume={handleResume} /> }

      <History items={historyList}/>
    </div>
  )
}
