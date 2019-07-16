import React from 'react'
import { Link } from 'react-router-dom'

function UserBasicInfo(props) {
  return (
    <tr>
      <td><Link to={`/users/${props.id}`}>{props.name}</Link> </td>
      <td>{props.blogs}</td>
    </tr>
  )
}

export default UserBasicInfo