import axios from 'axios'
import {createRef} from './firebase';
import {machiObject} from '../machiObjectTemplate'
// import { browserHistory } from 'react-router';


const reducer = (state=null, action) => {

  switch(action.type) {

    case 'SET_GAME':
      return action.game

    case 'CREATE_NEW_GAME':
      return action.game

    case 'FETCH_GAME':
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

const FETCH_GAME = 'FETCH_GAME'

export const fetchingGame = game => ({
  type: FETCH_GAME, game
})

export const createGame = () => {
  return dispatch =>
    axios.post('/api/lobby/')
      .then((game) => {
        const gameData = game.data
        dispatch(createRef(game.data.id));
        console.log('data', gameData)
        dispatch(creatingNewGame(gameData))
      })
      .catch(console.error)
}

export const fetchGame = (game) => {
  return dispatch => {
    axios.get(`/api/game/${game.gameLink}`)
      .then((uniqueGame) => {
        let id = uniqueGame.data.id

        database.child(id).on('value', snap => {
          console.warn('called');
          dispatch(fetchingGame(snap.val()))
        })
        // dispatch(fetchingGame(uniqueGame))
        console.log('am i in here fetching game')
      })
      .catch(console.error)
  }
}

export default reducer
