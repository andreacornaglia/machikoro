import firebaseKeys from '../../machiKeyPublic'
import firebase from 'firebase'
import {machiObject} from '../machiObjectTemplate.js'

firebase.initializeApp(firebaseKeys)

let database = firebase.database().ref();

export default (state = null, action) => {
    switch (action) {
      case 'SET_GAME_REF':
        return action.gameRef;
        break;
    }
    return state;
};

const setConnection = gameRef => ({
  type: 'SET_GAME_REF',
  gameRef
});

export const connectToGame = dispatch => gameId => {
  const ref = database.child(gameId);
  dispatch(setConnection(ref));
};

export const createRef = dispatch => gameId => {
  const gameRef = database.child(gameId);
  dispatch(setConnection(gameRef));
  gameRef.set(machiObject);
};