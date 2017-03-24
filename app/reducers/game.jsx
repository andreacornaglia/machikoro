import axios from 'axios'
// import { browserHistory } from 'react-router';

const reducer = (state=null, action) => {
  switch(action.type) {
  case 'SET_GAME':
    return action.game

  case 'CREATE_NEW_GAME':
    return action.game
  }
  return state
}

const SET_GAME = 'SET_GAME'

export const settingGame = game => ({
  type: SET_GAME, game
})

const CREATE_NEW_GAME = 'CREATE_NEW_GAME'

export const creatingNewGame = game => ({
  type: CREATE_NEW_GAME, game
})

export const createGame = () => {
  return dispatch =>
    axios.post('/api/lobby/')
      .then((game) => dispatch(creatingNewGame(game)))
      .catch(console.error)
}

export default reducer
