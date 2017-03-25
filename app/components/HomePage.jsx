import {login, logout} from '../reducers/auth'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import {browserHistory} from 'react-router'
import WhoAmI from './WhoAmI'

class Lobby extends Component {
  constructor(){
    super()
  }

  render(){
    return(
      <nav>
      {this.props.user ? <WhoAmI
        onClick={this.props.logout}
      /> : <div className="lobby-container">
        <h1>Welcome to Nyūyōku</h1>
          <div className="start-buttons">
            <Button bsStyle="info" bsSize="large" block onClick={(e) => {
                  e.preventDefault()
                  browserHistory.push('/login')
                }
              }>Login</Button>
            <Button bsStyle="warning" bsSize="large" block onClick={(e) => {
                  e.preventDefault()
                  browserHistory.push('/signup')
                }}>Create an account</Button>
          </div>
      </div>
      }
    </nav>
    )
  }
}
// <nav>
//   {this.props.user ?
//     <WhoAmI
//     onClick={this.props.logout}
//     /> : <Login /> }
// </nav>

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
