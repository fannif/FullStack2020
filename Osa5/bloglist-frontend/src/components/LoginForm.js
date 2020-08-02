import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  handleUsername,
  handlePassword,
  username,
  password
}) => {
  return (
    <form onSubmit={handleLogin}>
      <h2>Log in to the application</h2>
      <div>
        Username <input id='username' type="text" value={username} name="Username" onChange={handleUsername}/>
      </div>
      <div>
        Password <input id='password' type="password" value={password} name="Password" onChange={handlePassword}/>
      </div>
      <button id='login' type="submit">Login</button>
    </form>
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