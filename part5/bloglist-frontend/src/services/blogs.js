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


export default { 
  getAll,
  addBlogPost 
}