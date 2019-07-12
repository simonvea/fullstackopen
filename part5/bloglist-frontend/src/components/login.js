import React from 'react'

function LoginForm (props) {

  
  return (
    <form onSubmit={props.handleLogin}>
      <label htmlFor="username">Username: </label>
      <input 
        type="text"
        name="username"
        id="username"
        value={props.username}
        onChange={props.handleUsername}
        ></input>
      <label htmlFor="password">Password: </label>
      <input 
        type="password"
        name="password"
        id="password"
        value={props.password}
        onChange={props.handlePassword}
        ></input>
      <button type="submit">Log in</button>
    </form>
  )
}

export default LoginForm