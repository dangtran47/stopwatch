export const START = 'START'
export const STOP = 'STOP'
export const LAP = 'LAP'
export const RESET = 'RESET'
export const RESUME = 'RESUME'
export const UPDATE_COUNT = 'UPDATE_COUNT'

export const startAction = () => ({ type: START })

export const stopAction = () => ({ type: STOP })

export const resumeAction = () => ({ type: RESUME })

export const resetAction = () => ({ type: RESET })

export const lapAction = (newItem) => ({ type: LAP, payload: newItem })

export const updateCountAction = (delta) => ({ type: UPDATE_COUNT, payload: delta })
