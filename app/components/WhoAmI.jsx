import React from 'react'
import { Button } from 'react-bootstrap'
import {logout} from '../reducers/auth'
import {createGame} from '../reducers/gameServer'
import {connect} from 'react-redux'

export const WhoAmI = ({ user, game, logout, createGame}) => {
  return (
    <div className="lobby-container">
      <h1>Hi, {user && user.name}!</h1>
      <div className="start-buttons">
        <Button bsStyle="info" bsSize="large" block onClick={(evt) => {
            createGame()
          }}>Create Game</Button>
        <Button
          href="/"
          bsSize="large"
          className="btn-link"
          block
          onClick={(evt) => {
            evt.preventDefault()
            logout()
          }}>Logout
        </Button>
      </div>
    </div>
  )
}


export default connect (
  ({ auth, game }) => ({ user: auth, game }),
  {logout, createGame}
) (WhoAmI)
