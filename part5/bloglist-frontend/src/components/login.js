import React from 'react'

function LoginForm ({ username, password, handleLogin }) {

  password = { ...password, clear: undefined }
  username = { ...username, clear: undefined }

  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="username">Username: </label>
      <input
        name="username"
        id="username"
        {...username}
      ></input>
      <label htmlFor="password">Password: </label>
      <input
        name="password"
        id="password"
        {...password}
      ></input>
      <button type="submit">Log in</button>
    </form>
  )
}

export default LoginForm