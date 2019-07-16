import React from 'react'
import { connect } from 'react-redux'
import UserBasicInfo from './userBasicInfo'

function Users ({ users }) {

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>
            </th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => <UserBasicInfo key={user.id} id={user.id} name={user.name} blogs={user.posts.length}/>)}
        </tbody>
      </table>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(Users)