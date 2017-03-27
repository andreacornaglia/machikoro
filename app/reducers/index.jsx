import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  game: require('./game').default,
  status: require('./statusMsg').default,
  firebaseRef: require('./firebase').default
})

export default rootReducer
