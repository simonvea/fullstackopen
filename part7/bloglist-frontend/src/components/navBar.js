import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {

  const padding = {
    paddingRight: 5
  }


  return (
    <div>
      <Link to="/" style={padding}>Home</Link>
      <Link style={padding} to="/blogs">blogs</Link>
      <Link style={padding} to="/users">users</Link>
    </div>
  )
}

export default NavBar