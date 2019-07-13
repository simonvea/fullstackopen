import React from 'react'
import blogServices from '../services/blogs'
import { useField } from '../hooks'

function CreateBlog({ token, update }) {

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const blog = {
      title,
      author,
      url
    }

    await blogServices.addBlogPost(blog, token)

    update(blog)
    title.clear()
    author.clear()
    url.clear()
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