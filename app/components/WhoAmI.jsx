import React from 'react'
import { Button } from 'react-bootstrap'
import {logout} from '../reducers/auth'
import {createGame, fetchGame} from '../reducers/game'
import {connect} from 'react-redux'

export const WhoAmI = ({ user, game, logout, createGame, fetchGame }) => (

// export const WhoAmI = (props) => (
  <div>
    <div className="lobby-title">
      <h1>Hi, {user && user.name}!</h1>
      </div>
      <div className="whoami">
        <Button className="center-buttons" bsStyle="success" onClick={(evt) => {
            evt.preventDefault()
            createGame()
          }}>Create Game</Button>
        <Button className="center-buttons" href="/" onClick={logout}>Logout</Button>
        <h1>{game && game.gameLink}</h1>

    </div>
  </div>
)

// const mapState = (state) => {
//   return {
//     game: state.game,
//     user: state.auth
//   }
// }
//
// export default connect ((mapState),
//   {logout, createGame, fetchGame}
// ) (WhoAmI)

export default connect (
  ({ auth, game }) => ({ user: auth, game }),
  {logout, createGame, fetchGame}
) (WhoAmI)
