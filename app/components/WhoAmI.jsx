import React from 'react'
import { Button } from 'react-bootstrap'
import {logout} from '../reducers/auth'
import {createGame} from '../reducers/gameServer'
import {connect} from 'react-redux'

export const WhoAmI = ({ user, game, logout, createGame}) => {
  const classForDiv = game ? '' :  'hidden';
  const classForBtn = game ? 'hidden' : '';
  return(

  <div className="lobby-container">
      <h1>Hi, {user && user.name}!</h1>
      <div className="start-buttons">
        <Button bsStyle="info" className={classForBtn} bsSize="large" block onClick={(evt) => {
            evt.preventDefault()
            createGame()
          }}>Create Game</Button>
        <div className={classForDiv}>
          <p id="game-link" className="game-link">{game && 'localhost:1337/game/' + game.gameLink}</p>
          <p>Copy this link and send to your friends to play together!</p>
          <ul className="game-players">
            Friends that joined so far:
            {/*harcoded so far, substitute for real players*/}
            <li>Andrea has joined!</li>
            <li>Anne has joined!</li>
          </ul>
          <Button bsStyle="info" bsSize="large" block onClick={(evt) => {
            evt.preventDefault()
          }}>Start Game</Button>
        </div>
        <Button href="/" bsSize="large" className="btn-link" block onClick={(evt) => {
            evt.preventDefault()
            logout()
          }}>Logout</Button>
    </div>
      <h2>{game && 'localhost:1337/lobby/' + game.gameLink}</h2>
  </div>
)}


export default connect (
  ({ auth, game }) => ({ user: auth, game }),
  {logout, createGame}
) (WhoAmI)
