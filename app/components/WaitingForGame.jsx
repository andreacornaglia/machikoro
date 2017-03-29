import React from 'react'
import { Button } from 'react-bootstrap'
import {connect} from 'react-redux'
import {updatePlayers, updateGameStatus} from '../firebaseFunctions'
import {browserHistory} from 'react-router'
import {settingGame} from '../reducers/game'

class WaitingForGame extends React.Component {
  constructor(props) {
    super(props);
    this.redirectToGame = this.redirectToGame.bind(this);
  }

  redirectToGame() {
    const game = this.props.gameServer;
    updatePlayers(game);
    settingGame(game)
  }

  componentWillReceiveProps(nextProps){
    if (!nextProps.user){
      browserHistory.push('/home')
    }

  }

  render() {
    // need to check if user is owner, if so, render start game button
    // else render 'waiting...'
    return (
      <div>
      {this.props.gameServer && (this.props.gameServer.owner == this.props.user.id) ?
      <Button className="buffer provider-login-btn" bsStyle="danger" bsSize="small" onClick={this.redirectToGame}>Start Game
      </Button> : null }
      <h1>Please hold...</h1>
      {this.props.gameServer ? this.props.gameServer.users && this.props.gameServer.users.map((element, index) => {
          return (
            <h1 key={element.id}>{element.name} has joined the game</h1>
          )
        }): null}
      </div>
    )
  }
}


export default connect (
  ({ auth, game, gameServer }) => ({ user: auth, game, gameServer })
) (WaitingForGame)
