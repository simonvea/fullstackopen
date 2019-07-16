import React from 'react'
import { Link } from 'react-router-dom'

function Blog({ blog }){


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: 300,
  }

  return (
    <div style={blogStyle}>
      <div className="blog-title">
        <Link to={`/blogs/${blog.id}`} >{blog.title} {blog.author} </Link>
      </div>
    </div>
  )
}

export default Blog