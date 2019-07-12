import React, { useState } from 'react'
import blogServices from '../services/blogs'

function CreateBlog({ token, update }) {
  
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = ({ target }) => setTitle(target.value)
  const handleAuthorChange = ({ target }) => setAuthor(target.value)
  const handleUrlChange = ({ target }) => setUrl(target.value)

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const blog = {
      title,
      author,
      url
    }

    await blogServices.addBlogPost(blog, token)

    update(blog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <section>
       <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title: </label>
          <input 
            type="text" name="title" id="title"
            value={title}
            onChange={handleTitleChange}
            ></input>
          <label htmlFor="author">Author: </label>          
          <input 
            type="text" name="author" id="author"
            value={author}
            onChange={handleAuthorChange}
            ></input>
          <label htmlFor="title">Url: </label>          
          <input 
            type="text" name="url" id="url"
            value={url}
            onChange={handleUrlChange}
            ></input>
          <button type="submit">Create</button>          
      </form>
    </section>
  )
}

export default CreateBlog