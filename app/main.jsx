'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'

import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import {ref} from './firebase'
import {settingGame} from './reducers/game'

import GamePage from './components/GamePage'
import Opponent from './components/Opponent'

import AppContainer from './containers/AppContainer'

<<<<<<< HEAD
const setGame = () => {
  ref.on('value', snap => {
    store.dispatch(settingGame(snap.val()))
  })
}
=======
console.log('ref', ref)
//onGameEnter listen to firebase
// let num = 99
// setInterval(() => {
//   ref.child('cards').update({
//   'bakery': num++
//   })
// }, 1000)
>>>>>>> 90cfc5db450fa39a803e24302d6311dec627e085

render (
  <Provider store={store}>
    <Router history={browserHistory}>
<<<<<<< HEAD
      <Route path="/" component={AppContainer}>
        <IndexRedirect to="/game" />
        <Route path="/game" component={GamePage} onEnter={setGame}/>
=======
      <Route path="/" component={ExampleApp}>
        <IndexRedirect to="/jokes" />
        <Route path="/jokes" component={Jokes} />
>>>>>>> 90cfc5db450fa39a803e24302d6311dec627e085
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
