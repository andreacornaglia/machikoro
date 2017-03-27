import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  game: require('./game').default,
  status: require('./statusMsg').default,
  firebaseRef: require('./firebase').default
  // game from server / separate from firebase game to compare to whats on auth
})

export default rootReducer
