

const baseUrl = "http://localhost:3001/persons"

async function updatePerson(id, data) {

    const init = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const url = `${baseUrl}/${id}`
    const response = await fetch(url, init)
    return response.json()
}

async function deletePerson(id) {
    const init = {
        method: 'DELETE',
    }
    const url = `${baseUrl}/${id}`
    const response = await fetch(url, init)

    return response.json()
}

async function addPerson(person) {
    
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(person)
    }
    const response = await fetch(baseUrl, init)
    
    return response.json()
  }


async function getAll() {
    const persons = await fetch(baseUrl)
    return persons.json()
}

export default {getAll, addPerson, deletePerson, updatePerson}