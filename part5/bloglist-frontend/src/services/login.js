async function login (user) {
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }

  const url = '/api/login'

  const response = await fetch(url, init)

  return response.json()
}


export default { login }