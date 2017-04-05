import React from 'react'
import {Form, Col, Checkbox, Button, ButtonToolbar} from "react-bootstrap"
import {login} from '../reducers/auth'
import {connect} from 'react-redux'


export const Login = ({ login }) => (
  <div className="lobby-container">
    <a href="http://nyuyoku.herokuapp.com/"><h1>Welcome to Nyūyōku</h1></a>
    <Col sm={3}/>
    <Col sm={6}>
      <div className="login-area">
      <Form className="form-group" horizontal onSubmit={evt => {
        evt.preventDefault()
        if (location.search) {
          let gameLink = location.search.split('=')[1]
          login(evt.target.username.value, evt.target.password.value, gameLink)
        } else {
          login(evt.target.username.value, evt.target.password.value)
        }
      }}>
        <ButtonToolbar className="button-toolbar">
          <Button className="buffer provider-login-btn" bsStyle="danger" href="/api/auth/login/google" bsSize="small">Login with Google
          </Button>
          <Button className="buffer provider-login-btn" bsStyle="primary" href="/api/auth/login/facebook" bsSize="small" >Login with Facebook
          </Button>
        </ButtonToolbar>
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input className="form-control" type="email" name="username" placeholder="Email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input className="form-control" type="password" name="password" placeholder="Password" />
        </div>
        <div className="form-group">
          <Checkbox>Remember me</Checkbox>
        </div>
        <Button type="submit" value="Login">
          Login
        </Button>
        </Form>
        </div>
        </Col>
      <Col sm={3} />
  </div>
)


export default connect(null, {login})(Login)
