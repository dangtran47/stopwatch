export const START = 'START'
export const STOP = 'STOP'
export const LAP = 'LAP'
export const RESET = 'RESET'
export const RESUME = 'RESUME'
export const UPDATE_COUNT = 'UPDATE_COUNT'

export const startAction = () => {
  return { type: START }
}

export const stopAction = () => {
  return { type: STOP }
}

export const resumeAction = () => {
  return { type: RESUME }
}

export const resetAction = () => {
  return { type: RESET }
}

export const lapAction = (newItem) => {
  return { type: LAP, payload: newItem }
}

export const updateCountAction = (delta) => {
  return { type: UPDATE_COUNT, payload: delta }
}
