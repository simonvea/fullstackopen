import React, { useState, useEffect } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')


  const checkName = (name) => {
    return persons.findIndex((person) => person.name === name) !== -1
  }

  const addName = (event) => {
    event.preventDefault()

    if(checkName(newName)) {
      alert(`${newName} is already added to phonebook` )
      return
    }

    const nameObject = {
      name: newName,
      number: newNumber,
    }
  
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)


  const Names = (props) => {
    if(filter.length > 0) {
      return persons.filter(person => person.name.toLowerCase().includes(filter)).map(person => <p key={person.name}>{person.name} {person.number}</p>)
    } else {
      return persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
    }
  }

  const Filter = ({filter, handleFilterChange}) => {
    return (
      <p>filter shown with 
        <input value={filter} onChange={handleFilterChange}/>
      </p>
    )
  }

  const Form = (props) => {
    return (
      <form onSubmit={props.addName}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange}/>
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    )
  }

  const fetchHook = () => {
    fetch('http://localhost:3001/persons')
      .then(res => res.json())
      .then(data => setPersons(data))
      .catch(err => console.err(err))
  }

  useEffect(fetchHook, []);

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter 
          filter={filter}
          handleFilterChange={handleFilterChange}
        />
      <h2>Add a new</h2>
        <Form 
          addName={addName}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />
      <h2>Numbers</h2>
      <Names />
    </div>
  )
}

export default App