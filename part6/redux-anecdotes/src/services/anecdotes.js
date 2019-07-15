
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

async function addVote (object) {
  const id = object.id

  const init = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({...object, votes: object.votes + 1})
  }

  const url = `${baseURL}/${id}`

  const response = await fetch(url, init)

  return response.json()
}

export default {
  getAll,
  createNew,
  addVote,
}