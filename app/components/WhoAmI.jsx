import React from 'react'
import { Button } from 'react-bootstrap'
import {logout} from '../reducers/auth'
import {createGame, fetchGame} from '../reducers/game'
import {connect} from 'react-redux'

export const WhoAmI = ({ user, game, logout, createGame, fetchGame }) => (
  <div className="lobby-container">
    <div className="lobby-title">
      <h1>Hi, {user && user.name}!</h1>
      </div>
      <div className="whoami">
        <Button className="center-buttons" bsStyle="success" onClick={(evt) => {
            evt.preventDefault()
            createGame()
          }}>Create Game</Button>
         <h1>{game && 'localhost:1337/game/' + game.gameLink}</h1>
        <Button className="center-buttons" href="/" onClick={(evt) => {
            evt.preventDefault()
            logout()
          }}>Logout</Button>
    </div>
  </div>
)


export default connect (
  ({ auth, game }) => ({ user: auth, game }),
  {logout, createGame, fetchGame}
) (WhoAmI)
