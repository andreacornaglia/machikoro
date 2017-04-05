import {logout, guestLogin} from '../reducers/auth'
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
        <a href="http://nyuyoku.herokuapp.com/"><h1>Welcome to Nyūyōku</h1></a>
          <div className="start-buttons">
            <Button className="btn-login"
                    bsStyle="info"
                    bsSize="large"
                    block
                    onClick={(e) => {
                      e.preventDefault()
                      browserHistory.push('/login')
                    }}
            >Login
            </Button>
            <Button className="btn-guest-login"
                    bsStyle="info"
                    bsSize="large"
                    block
                    onClick={(e) => {
                      e.preventDefault()
                      this.props.guestLogin()
                    }}
            >
            Guest Login
            </Button>
            <Button className="btn-link"
                    bsSize="large"
                    block
                    onClick={(e) => {
                      e.preventDefault()
                      browserHistory.push('/signup')
                    }}
          >
          Create an account
          </Button>
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
      guestLogin: () => {
        dispatch(guestLogin());
      },
      logout: (e) => {
        e.preventDefault()
        dispatch(logout());
      }
    }
  }
)(Lobby)
