import React from 'react'
import { Button } from 'react-bootstrap'
import {logout} from '../reducers/auth'
import {connect} from 'react-redux'

export const WhoAmI = ({ user, logout }) => (
  <div className="whoami">
    <span className="whoami-user-name">{user && user.name}</span>
    <LinkContainer to="/">
      <Button className="center-buttons" onClick={logout}>Logout</Button>
    </LinkContainer>
  </div>
)

export default connect (
  ({ auth }) => ({ user: auth }),
  {logout},
) (WhoAmI)
