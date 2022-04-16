import { useState, useEffect, useRef } from 'react'

const useNow = () => {
  const [now, setNow] = useState()
  const requestRef = useRef()

  useEffect(() => {
    const updateTime = (time) => {
      setNow(time)
      requestRef.current = requestAnimationFrame(updateTime)
    }

    updateTime()

    return () => cancelAnimationFrame(requestRef.current)
  }, [])

  return now
}

export default useNow
