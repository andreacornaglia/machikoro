import {login, logout} from '../reducers/auth'
import {connect} from 'react-redux'
import React, {Component} from 'react'

import Login from './Login'
import WhoAmI from './WhoAmI'

class Lobby extends Component {
  constructor(){
    super()
  }

  render(){
    return(
      <div className="lobby-container">
          <nav>
            {this.props.user ?
              <WhoAmI
              onClick={this.props.logout}
              /> : <Login />}
          </nav>
      </div>
    )
  }
}

export default connect(
  ({ auth }) => ({ user: auth }),
  (dispatch) => {
    return {
      logout: (e) => {
        e.preventDefault()
        dispatch(logout());
      }
    }
  }
)(Lobby)
