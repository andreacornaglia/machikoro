import React from 'react'
import {Form, Col, FormGroup, Checkbox, Button, ButtonToolbar, ControlLabel, FormControl} from "react-bootstrap"
import {signup} from '../reducers/auth'
import {connect} from 'react-redux'


export const Signup = ({ signup }) => (
  <div className="lobby-container">
    <h1>Welcome to Nyūyōku</h1>

    <div className="form-container">
    <Form
      horizontal
      onSubmit={evt => {
        evt.preventDefault()
        signup(evt.target.name.value, evt.target.email.value, evt.target.password.value)
      }}>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={4} />
          <Col sm={4}>
            <ButtonToolbar className="button-toolbar">
              <Button className="buffer provider-login-btn" bsStyle="danger" href="/api/auth/login/google" bsSize="small">Sign Up with Google
              </Button>
              <Button className="buffer provider-login-btn" bsStyle="primary" href="/api/auth/login/facebook" bsSize="small" >Sign Up with Facebook
              </Button>
            </ButtonToolbar>
          </Col>
        </FormGroup>
        <FormGroup controlId="formControlsText">
          <Col componentClass={ControlLabel} sm={4}>
            Name
          </Col>
          <Col sm={4}>
            <FormControl type="text" name="name" placeholder="Name" />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={4}>
            Email
          </Col>
          <Col sm={4}>
            <FormControl type="email" name="email" placeholder="Email" />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={4}>
            Password
          </Col>
          <Col sm={4}>
            <FormControl type="password" name="password" placeholder="Password" />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={4} sm={4}>
            <Checkbox>Remember me</Checkbox>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={4} sm={4}>
            <Button type="submit" value="Sign Up">
              Sign Up
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  </div>
)


export default connect(null, {signup})(Signup)
