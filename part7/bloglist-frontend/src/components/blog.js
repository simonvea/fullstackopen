import React, { useState } from 'react'
import { connect } from 'react-redux'
import blogServices from '../services/blogs'
import { useField } from '../hooks'

function Blog(props){
  const { blog, user, update } = props

  const [likes, setLikes] = useState(blog.likes)
  const [commentField, clearField] = useField('text')

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: 300,
  }

  const handleLike = async () => {
    const userId = blog.user.id
    const blogId = blog.id

    const newPost = {
      ...blog,
      likes: likes +1,
      user: userId,
    }

    await blogServices.editPost(newPost, blogId)

    setLikes(likes +1)
  }

  const handleDelete = async () => {
    const blogId = blog.id
    const token = user.token

    if(window.confirm(`delete ${blog.title} by ${blog.author}?`)) {
      const response = await blogServices.deletePost(blogId, token)
      if(response === 204) {
        update()
      }
      else {
        console.error(`deletion failed with status ${response}`)
      }
    }

  }

  const submitComment = async (blogId) => {
    const comment = commentField.value

    await blogServices.addComment(comment, blogId)


    clearField()
  }

  const showWhenUser = { display: user.username === blog.user.username ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div className="blog-title">
        {blog.title} {blog.author}
      </div>
      <div className="blog-info" >
        <div>
          {likes} likes <button type="button" onClick={handleLike}>like</button>
        </div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.user ? `added by ${blog.user.name}`: null}
        </div>
        <div style={showWhenUser}>
          <button type="button" onClick={handleDelete}>delete</button>
        </div>
        <div>
          <h3>comments</h3>
          <input {...commentField}></input>
          <button onClick={() => submitComment(blog.id)}>add comment</button>
          <ul>
            {blog.comments.map((comment, index) => <li key={index}> {comment} </li>)}
          </ul>
        </div>
      </div>

    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    blog: state.blogs.find(blog => blog.id === ownProps.id),
    user: state.user,
    update: ownProps.update
  }
}

export default connect(mapStateToProps)(Blog)