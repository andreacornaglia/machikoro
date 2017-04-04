import {logout} from '../reducers/auth'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import {browserHistory} from 'react-router'
import WhoAmI from './WhoAmI'

class Lobby extends Component {
  render(){
    return (
      <nav>
        {this.props.user ? <WhoAmI
          onClick={this.props.logout}
        /> : <div className="lobby-container">
        <h1>Welcome to Nyūyōku</h1>
        <div className="start-buttons">
          <Button className="btn-login" bsStyle="info" bsSize="large" block onClick={(e) => {
              e.preventDefault()
              browserHistory.push('/login')
            }}>Login</Button>
          <Button className="btn-link" bsSize="large" block onClick={(e) => {
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
