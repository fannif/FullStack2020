import React from 'react'
import { Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  handleUsername,
  handlePassword,
  username,
  password
}) => {
  return (
    <div>
      <h2>Log in to the application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username </Form.Label>
          <Form.Control id='username' type="text" value={username} name="Username" onChange={handleUsername}/>
          <Form.Label>Password </Form.Label>
          <Form.Control id='password' type="password" value={password} name="Password" onChange={handlePassword}/>
          <Button variant='primary' id='login' type='submit'>Login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
}

export default LoginForm