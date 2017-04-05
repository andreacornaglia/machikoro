import React from 'react'
import {Form, Col, FormGroup, Checkbox, Button, ButtonToolbar, ControlLabel, FormControl} from "react-bootstrap"
import {signup} from '../reducers/auth'
import {connect} from 'react-redux'


export const Signup = ({ signup }) => (
  <div className="lobby-container">
    <a href="http://nyuyoku.herokuapp.com/"><h1>Welcome to Nyūyōku</h1></a>
    <Col sm={3}/>
    <Col sm={6}>
    <div className="login-area">
      <Form className="form-group" horizontal onSubmit={evt => {
        evt.preventDefault()
        signup(evt.target.name.value, evt.target.email.value, evt.target.password.value)
      } }>
      <ButtonToolbar className="button-toolbar">
        <Button className="buffer provider-login-btn" bsStyle="danger" href="/api/auth/login/google" bsSize="small">Sign Up with Google
        </Button>

        <Button className="buffer provider-login-btn" bsStyle="primary" href="/api/auth/login/facebook" bsSize="small" >Sign Up with Facebook
        </Button>
      </ButtonToolbar>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input className="form-control" type="name" name="name" placeholder="Name" />
      </div>

      <div className="form-group">
        <label htmlFor="username">Email</label>
        <input className="form-control" type="email" name="email" placeholder="Email" />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input className="form-control" type="password" name="password" placeholder="Password" />
      </div>

      <div className="form-group">
          <Checkbox>Remember me</Checkbox>
      </div>

      <Button type="submit" value="Sign Up">
        Sign Up
      </Button>

    </Form>
    </div>
   </Col>
  <Col sm={3}/>
</div>
)


export default connect(null, {signup})(Signup)
