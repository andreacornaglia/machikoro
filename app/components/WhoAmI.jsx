import React from 'react'
import { Button } from 'react-bootstrap'
import {logout} from '../reducers/auth'
import {connect} from 'react-redux'

export const WhoAmI = ({ user, logout }) => (
  <div className="whoami">
    <span className="whoami-user-name">{user && user.name}</span>

      <Button className="center-buttons" bsStyle="success" onClick={logout}>Start Game</Button>
      <Button className="center-buttons" bsStyle="warning" onClick={logout}>Join Game</Button>
      
      <Button className="center-buttons" href="/" onClick={logout}>Logout</Button>
  </div>
)

export default connect (
  ({ auth }) => ({ user: auth }),
  {logout},
) (WhoAmI)
