'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
// import Login from './components/Login'
// import {WhoAmI} from './components/WhoAmI'
import {settingGame, fetchGame} from './reducers/game'
import {connectToGame} from './reducers/firebase';
import axios from 'axios';

import GamePage from './components/GamePage'
import HomePage from './components/HomePage'
import Login from './components/Login'
import Signup from './components/Signup'
import AppContainer from './containers/AppContainer'

const setGame = () => {
  ref.on('value', snap => {
    store.dispatch(settingGame(snap.val()))
  })
}

const addUserToGame = () => {

};

class WaitingForGame extends React.Component {
  componentDidMount() {
    axios.get(`/api/game/${this.props.params.gameLink}`)
      .then(res => res.data)
      .then(game => {
        console.log(store.getState());
        store.dispatch(connectToGame(game.id));
        console.log(store.getState());
      });
  }
  render() {
    return <h1>You are waiting for a game</h1>;
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
        <Route path="/game/:gameLink" component={GamePage} onEnter={setGame}/>
        <Route path="/lobby/:gameLink" component={WaitingForGame} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
