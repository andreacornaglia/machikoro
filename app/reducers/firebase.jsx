import firebaseKeys from '../../machiKeyPublic'
import firebase from 'firebase'
import {machiObject} from '../machiObjectTemplate.js'
import {settingGame} from './game';

firebase.initializeApp(firebaseKeys)

let database = firebase.database().ref();

export default (state = null, action) => {
  switch (action.type) {
    case 'SET_GAME_REF':
      return action.gameRef;
  }
  return state;
};

const setConnection = gameRef => ({
  type: 'SET_GAME_REF',
  gameRef
});

export const connectToGame = gameLink => dispatch => {
  let ref = database.child(gameLink);
  ref.on('value', snap => {
      dispatch(settingGame(snap.val()));
  });
  dispatch(setConnection(ref));
};

export const createRef = gameLink => dispatch => {
  let gameRef = database.child(gameLink);
  dispatch(setConnection(gameRef));
  gameRef.set(machiObject);
};
