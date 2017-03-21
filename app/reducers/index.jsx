import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  game: require('./game').default,
  snapshot: require('./access').default
})

export default rootReducer
