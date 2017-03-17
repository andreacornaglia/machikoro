'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import {ref} from './firebase'
import {settingGame} from './reducers/game'
import TotalCards from './components/TotalCards'
import selfCarousel from './components/selfCarousel'

import AppContainer from './containers/AppContainer'

// const ExampleApp = connect(
//   ({ auth }) => ({ user: auth })
// ) (
//   ({ user, children }) =>
//     <div>
//       <nav>
//         {user ? <WhoAmI/> : <Login/>}
//       </nav>
//       {children}
//     </div>
// )

ref.on('value', snap => {
  store.dispatch(settingGame(snap.val()))
})


console.log('ref', ref)
//onGameEnter listen to firebase
let num = 99
// setInterval(() => {
//   ref.child('cards').update({
//   'bakery': num++
//   })
// }, 1000)

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <IndexRedirect to="/jokes" />
        <Route path="/jokes" component={TotalCards} />
        <Route path="/test" component={selfCarousel} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
