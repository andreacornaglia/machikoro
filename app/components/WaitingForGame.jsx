import React from 'react'
import { Button } from 'react-bootstrap'
import {connect} from 'react-redux'

class WaitingForGame extends React.Component {
  render() {
    // need to check if user is owner, if so, render start game button
    // else render 'waiting...'
    return (
      <div>
      <Button className="buffer provider-login-btn" bsStyle="danger" bsSize="small">Start Game
      </Button>
      <h1>Please hold...</h1>
      </div>
    )
  }
}


export default connect (
  ({ auth, game }) => ({ user: auth, game }),
) (WaitingForGame)
