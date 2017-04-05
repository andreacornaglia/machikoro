import React from 'react'
import { Button } from 'react-bootstrap'
import {connect} from 'react-redux'
import {updatePlayers} from '../firebaseFunctions'
import {browserHistory} from 'react-router'
import {settingGame} from '../reducers/game'
import {startGame, retrieveUsers} from '../reducers/gameServer'

class WaitingForGame extends React.Component {
  constructor(props) {
    super(props);
    this.redirectToGame = this.redirectToGame.bind(this);
    this.state = {link:''}
  }

  componentDidMount(){
  //update users in game state every 2 seconds to see who joined the game
   this.interval  = setInterval(() => {
     const gameLink = this.props.gameServer.gameLink;
     this.props.retrieveUsers(gameLink)
     if (this.props.gameServer.status === 'started') {
       browserHistory.push(`/game/${gameLink}`)
     }
   }, 1000)
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  redirectToGame() {
    //we need an axios request to change the game status
    this.props.startGame(this.props.gameServer.gameLink)
    //players need to listen to game change to get redirected
    const game = this.props.gameServer;
    updatePlayers(game);
    settingGame(game)
  }

  componentWillReceiveProps(nextProps){
    const gameLink = this.props.params.gameLink
    if (!nextProps.user){
      const link = (location.hostname === 'nyuyoku.herokuapp.com') ?
        `https://nyuyoku.herokuapp.com/lobby/${gameLink}` : `localhost:1337/lobby/${gameLink}`
      browserHistory.push(link)
    }
  }

  render(){
    const gameLink = this.props.gameServer ? this.props.gameServer.gameLink : null
    const path = 'https://nyuyoku.herokuapp.com/lobby/'
    return (
      <div className="lobby-container">
        <h1>Waiting for players to join</h1>
        <div className="start-buttons">
          {this.props.gameServer &&
            <p id="game-link" className="game-link">
              {(location.hostname === 'nyuyoku.herokuapp.com') ? `https://nyuyoku.herokuapp.com/lobby/${gameLink}` : `localhost:1337/lobby/${gameLink}`}
            </p>
          }
          <p>Copy this link and send to your friends to play together!</p>
          <ul className="game-players">
            Friends that joined so far:
            {this.props.gameServer ? this.props.gameServer.users && this.props.gameServer.users.map((element, index) => {
          return (
            <li key={element.id}>{element.name} has joined the game</li>
          )}) : null}
          </ul>
          {this.props.gameServer && (this.props.gameServer.owner == this.props.user.id) ?
          <Button className="buffer provider-login-btn" bsStyle="info" bsSize="large" block onClick={this.redirectToGame}>Start Game</Button> : null }
        </div>
      </div>
    )
  }
}


export default connect (
  ({ auth, game, gameServer }) => ({ user: auth, game, gameServer }), (dispatch) => (
    {retrieveUsers: (gameLink) => dispatch(retrieveUsers(gameLink)),
     startGame: (gameLink) => dispatch(startGame(gameLink))                                             })
) (WaitingForGame)
