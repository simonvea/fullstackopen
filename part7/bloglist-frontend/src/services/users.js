const baseUrl = '/api/users'

async function getAll () {

  const response = await fetch(baseUrl)

  return response.json()
}

export default {
  getAll,
}