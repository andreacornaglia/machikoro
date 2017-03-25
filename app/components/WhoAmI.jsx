import React from 'react'
import { Button } from 'react-bootstrap'
import {logout} from '../reducers/auth'
import {createGame, fetchGame} from '../reducers/game'
import {connect} from 'react-redux'

export const WhoAmI = ({ user, game, logout, createGame, fetchGame }) => (
  <div className="lobby-container">
      <h1>Hi, {user && user.name}!</h1>
      <div className="start-buttons">
        <Button bsStyle="success" bsSize="large" block onClick={(evt) => {
            evt.preventDefault()
            createGame()
          }}>Create Game</Button>
        <Button href="/" bsSize="large" block onClick={(evt) => {
            evt.preventDefault()
            logout()
          }}>Logout</Button>
    </div>
      <h1>{game && 'localhost:1337/game/' + game.gameLink}</h1>
  </div>
)


export default connect (
  ({ auth, game }) => ({ user: auth, game }),
  {logout, createGame, fetchGame}
) (WhoAmI)
