import axios from 'axios'
import {createRef, connectToGame} from './firebase';
import { browserHistory } from 'react-router';

const reducer = (state=null, action) => {

  switch (action.type) {
    case "RECEIVE_DBGAME":
      return action.game

    case 'CREATE_NEW_GAME':
      return action.game
    }
  return state
}

//ACTION CREATORS

export const receivingDBGame = (game) => ({
  type: "RECEIVE_DBGAME", game
})

const CREATE_NEW_GAME = 'CREATE_NEW_GAME'

export const creatingNewGame = game => ({
  type: CREATE_NEW_GAME, game
})

export const createGame = () => {
  return dispatch =>
    axios.post('/api/lobby/')
      .then((game) => {
        const gameData = game.data
        dispatch(createRef(gameData.gameLink));

        return gameData
      })
      .then((game) => {
        dispatch(creatingNewGame(game))
        browserHistory.push(`/lobby/${game.gameLink}`)
      })
      .catch(console.error)
}

export const getDBGame = (gameLink) => {
  return dispatch => {
    axios.get(`/api/lobby/${gameLink}`)
    .then(res => res.data)
    .then(game => {
      dispatch(connectToGame(game.id))
      dispatch(receivingDBGame(game))
    })
    .catch(console.error)
  }
}


export default reducer
