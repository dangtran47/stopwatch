import React,  { useRef, useEffect, useReducer } from 'react'

import StopWatchInitial from './StopWatchInitial'
import StopWatchRunning from './StopWatchRunning'
import StopWatchStopped from './StopWatchStopped'
import History from './History'
import './index.css'

import { timeReducer } from '../../reducers'
import { initState as timeInitialState } from '../../reducers/time'
import { startAction, stopAction, resumeAction, resetAction, lapAction, updateCountAction } from '../../actions'
import { useNow } from '../../hooks'

export default () => {
  const [{ count, hasStarted, isPausing, historyList }, dispatch] = useReducer(timeReducer, timeInitialState)
  const now = useNow()

  const previousTimeRef = useRef(0)

  useEffect(() => {
    if (hasStarted && !isPausing) {
      dispatch(updateCountAction(now - previousTimeRef.current))
    }

    previousTimeRef.current = now
  }, [hasStarted, isPausing, now])

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
