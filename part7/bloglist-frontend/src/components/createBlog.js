import React from 'react'
import blogServices from '../services/blogs'
import { useField } from '../hooks'

function CreateBlog({ token, update }) {

  const [title, clearTitle] = useField('text')
  const [author, clearAuthor] = useField('text')
  const [url, clearUrl] = useField('text')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }

    await blogServices.addBlogPost(blog, token)

    update(blog)
    clearTitle()
    clearAuthor()
    clearUrl()
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input
          name="title" id="title"
          {...title}
        ></input>
        <label htmlFor="author">Author: </label>
        <input
          name="author" id="author"
          {...author}
        ></input>
        <label htmlFor="title">Url: </label>
        <input
          name="url" id="url"
          {...url }
        ></input>
        <button type="submit">Create</button>
      </form>
    </section>
  )
}

export default CreateBlog