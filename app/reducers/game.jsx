import axios from 'axios'
import {createRef, connectToGame} from './firebase';
import {getDBGame} from './gameServer'
import {whoami} from './auth'
import {machiObject} from '../machiObjectTemplate'
import { browserHistory } from 'react-router';


const reducer = (state=null, action) => {

  switch(action.type) {

    case 'SET_GAME':
      return action.game

    // case 'FETCH_GAME':
    //   return action.game
  }

  return state
}

const SET_GAME = 'SET_GAME'

export const settingGame = game => {
  return { type: SET_GAME, game };
}

// const FETCH_GAME = 'FETCH_GAME'

// export const fetchingGame = game => ({
//   type: FETCH_GAME, game
// })

// export const fetchGame = (game) => {
//   return dispatch => {
//     axios.get(`/api/game/${game.gameLink}`)
//       .then((uniqueGame) => {
//         let gameLink = uniqueGame.data.gameLink

//         database.child(gameLink).on('value', snap => {
//           console.warn('called');
//           dispatch(fetchingGame(snap.val()))
//         })
//         dispatch(getDBGame(uniqueGame))
//         console.log('am i in here fetching game')
//       })
//       .catch(console.error)
//   }
// }



export default reducer
