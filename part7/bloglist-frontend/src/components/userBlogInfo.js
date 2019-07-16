import React from 'react'
import { connect } from 'react-redux'

function UserBlogInfo({ user }) {

  if(!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>Added blogs</h4>
      <ul>
        {user.posts.map(post => <li key={post.id}>{post.title}</li>)}
      </ul>
    </div>

  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users.find(user => user.id === ownProps.id)
  }
}

export default connect(mapStateToProps)(UserBlogInfo)