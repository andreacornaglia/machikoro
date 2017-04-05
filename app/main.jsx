'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import store from './store'
// import {settingGame} from './reducers/game'
import {getDBGame} from './reducers/gameServer'
import {connectToGame} from './reducers/firebase';
import axios from 'axios';

import GamePage from './components/GamePage'
import HomePage from './components/HomePage'
import Login from './components/Login'
import Signup from './components/Signup'
import WaitingForGame from './components/WaitingForGame'
import AppContainer from './containers/AppContainer'

const firebaseRef = store.getState().firebaseRef;

const onEnterAddUser = (nextState) => {
  let routeGameLink = nextState.params.gameLink
  store.dispatch(getDBGame(routeGameLink))
}

const onGameEnter = (nextState) => {
  let routeGameLink = nextState.params.gameLink
  if (!store.getState().firebaseRef) {
    axios.get(`/api/game/${routeGameLink}`)
      .then(game => {
        store.dispatch(connectToGame(game.data.gameLink))
      })
      .catch(console.error)
  }
}

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <IndexRedirect to="/home" />
        <Route path="/home" component={HomePage} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/lobby" component={HomePage} />
        <Route path="/game/:gameLink" component={GamePage} onEnter={onGameEnter} />
        <Route path="/lobby/:gameLink" component={WaitingForGame} onEnter={onEnterAddUser} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
