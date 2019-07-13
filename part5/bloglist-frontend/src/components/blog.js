import React, { useState } from 'react'
import blogServices from '../services/blogs'

function Blog({ blog, user, update, }){
  const [active, setActive] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const showWhenActive = { display: active ? '' : 'none' }
  const showWhenUser = { display: user.username === blog.user.username ? '' : 'none' }


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

  return (
    <div style={blogStyle}>
      <div onClick={() => setActive(!active)}>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenActive}>
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
      </div>

    </div>
  )
}

export default Blog