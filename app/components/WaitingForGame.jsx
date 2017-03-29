import React from 'react'
import { Button } from 'react-bootstrap'
import {connect} from 'react-redux'
import {updatePlayers} from '../firebaseFunctions'
import {browserHistory} from 'react-router'

class WaitingForGame extends React.Component {
  constructor(props) {
    super(props);
    this.redirectToGame = this.redirectToGame.bind(this);
  }

  redirectToGame() {
    const game = this.props.gameServer;
    updatePlayers(game);
  }

  componentWillReceiveProps(nextProps){
    if (!nextProps.user){
      browserHistory.push('/home')
    }
  }

  render(){
    return (
      <div className="lobby-container">
        <h1>Waiting for players to join</h1>
        <div className="start-buttons">
          <p id="game-link" className="game-link">{this.props.gameServer && 'localhost:1337/lobby/' + this.props.gameServer.gameLink}</p>
          <p>Copy this link and send to your friends to play together!</p>
          <ul className="game-players">
            Friends that joined so far:
            {this.props.gameServer ? this.props.gameServer.users && this.props.gameServer.users.map((element, index) => {
          return (
            <li key={element.id}>{element.name} has joined the game</li>
          )
        }): null}
          </ul>
        {this.props.gameServer && (this.props.gameServer.owner == this.props.user.id) ?
          <Button className="buffer provider-login-btn" bsStyle="info" bsSize="large" block onClick={this.redirectToGame}>Start Game</Button> : null }
       </div>
     </div>
    )
  }
}


export default connect (
  ({ auth, game, gameServer }) => ({ user: auth, game, gameServer })
) (WaitingForGame)
