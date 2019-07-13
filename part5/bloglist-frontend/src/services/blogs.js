const baseUrl = '/api/blogs'

async function getAll () {

  const response = await fetch(baseUrl)

  return response.json()
}

async function addBlogPost (blog, token) {
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${token}`
    },
    body: JSON.stringify(blog)
  }

  const response = await fetch(baseUrl, init)

  return response.json()
}

async function editPost (blog, id) {
  const init = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      //'Authorization': `bearer ${token}`
    },
    body: JSON.stringify(blog)
  }

  const url = `${baseUrl}/${id}`

  const response = await fetch(url, init)

  return response.json()
}

async function deletePost (blogId, token) {
  const init = {
    method: 'DELETE',
    headers: {
      'Authorization': `bearer ${token}`
    },
  }

  const url = `${baseUrl}/${blogId}`

  const response = await fetch(url, init)

  return response.status
}


export default {
  getAll,
  addBlogPost,
  editPost,
  deletePost,
}
