import { START, STOP, RESUME, RESET, LAP, UPDATE_COUNT} from '../actions'

import { formatTime } from '../utils'

export const initState = {
  count: 0,
  hasStarted: false,
  isPausing: false,
  historyList: []
}

const timeReducer = (state = initState, action) => {
  switch(action.type) {
    case START:
      return { ...state, hasStarted: true }

    case STOP:
      return { ...state, isPausing: true }

    case RESUME:
      return { ...state, isPausing: false }

    case RESET:
      return initState

    case LAP:
      return { ...state, historyList: [formatTime(state.count), ...state.historyList].slice(0,10) }

    case UPDATE_COUNT:
      return { ...state, count: state.count + action.payload }

    default:
      return state
  }
}

export default timeReducer;
