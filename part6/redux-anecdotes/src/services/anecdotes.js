
const baseURL = "http://localhost:3001/anecdotes"

async function getAll() {
  const response = await fetch(baseURL) 

  return response.json()
}

async function createNew(anecdote) {

  const object = {
    content: anecdote,
    votes: 0
  }

  const json = JSON.stringify(object)

  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: json
  }

  const response = await fetch(baseURL, init)
  return response.json()

}

export default {
  getAll,
  createNew,
}