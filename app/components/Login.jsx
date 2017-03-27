import React from 'react'
import {Form, Col, FormGroup, Checkbox, Button, ButtonToolbar, ControlLabel, FormControl} from "react-bootstrap"
import {login} from '../reducers/auth'
import {connect} from 'react-redux'


export const Login = ({ login }) => (
  <div className="lobby-container">
    <h1>Welcome to Nyūyōku</h1>

  <div className="form-container">
      <Form horizontal onSubmit={evt => {
        evt.preventDefault()
        login(evt.target.username.value, evt.target.password.value)
      } }>

      <FormGroup>
        <Col componentClass={ControlLabel} sm={4} />
        <Col sm={4}>
          <ButtonToolbar className="button-toolbar">
            <Button className="buffer provider-login-btn" bsStyle="danger" href="/api/auth/login/google" bsSize="small">Login with Google
            </Button>

            <Button className="buffer provider-login-btn" bsStyle="primary" href="/api/auth/login/facebook" bsSize="small" >Login with Facebook
            </Button>
           </ButtonToolbar>
         </Col>
     </FormGroup>

      <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={4}>
            Email
          </Col>
          <Col sm={4}>
            <FormControl type="email" name="username" placeholder="Email" />
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
            <Button type="submit" value="Login">
              Login
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  </div>

)


export default connect(null, {login})(Login)
