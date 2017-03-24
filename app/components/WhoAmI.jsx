import React from 'react'
import { Button } from 'react-bootstrap'
import {logout} from '../reducers/auth'
import {connect} from 'react-redux'

export const WhoAmI = ({ user, logout }) => (
  <div>
    <div className="lobby-title">
      <h1>Hi, {user && user.name}!</h1>
      </div>
      <div className="whoami">
        <Button className="center-buttons" bsStyle="success" onClick={logout}>Start Game</Button>
        <Button className="center-buttons" href="/" onClick={logout}>Logout</Button>
    </div>
  </div>
)

export default connect (
  ({ auth }) => ({ user: auth }),
  {logout},
) (WhoAmI)
