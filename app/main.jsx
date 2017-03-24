'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
// import Login from './components/Login'
// import {WhoAmI} from './components/WhoAmI'
import {ref} from './firebase'
import {settingGame} from './reducers/game'

import GamePage from './components/GamePage'
import HomePage from './components/HomePage'

import AppContainer from './containers/AppContainer'

const setGame = () => {
  ref.on('value', snap => {
    store.dispatch(settingGame(snap.val()))
  })
}


render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <IndexRedirect to="/login" />
        <Route path="/login" component={HomePage} />
        <Route path="/lobby" component={HomePage} />
        <Route path="/game" component={GamePage} onEnter={setGame}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
