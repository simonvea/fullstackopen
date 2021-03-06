import React, { useState, useEffect } from 'react'
import personService from './services/persons.js'

const Name = ({person, deleteHandler}) => {
  return (
    <div>
       {person.name} {person.number} <button onClick={() => deleteHandler(person.id)}>delete</button>
    </div>
  )
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

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ alertMessage, setAlertMessage ] = useState([])


  const checkName = (name) => {
    return persons.findIndex((person) => person.name === name) !== -1
  }

  const Message = ({msg}) => {
    const [name, alert, message] = msg
    //if(!name) {return null}

    let color, bgColor, text;

    if(alert === "add") {
      color = "green"
      bgColor = "lightgreen"
      text = `Added ${name}`
    } else if (alert === "error") {
      color = "red"
      bgColor = "rosybrown"
      text = message || `Information of ${name} has already been removed from server`
    }
    
    const msgStyle = {
      border: `2px solid ${color}`,
      backgroundColor: `${bgColor}`,
      fontSize: 16,
      color: `${color}`,
      borderRadius: 2,
      padding: 4,
      width: 200
    }


    return (
      <div style={msgStyle}>
         {text}
      </div>
    )
  }

  const addName = (event) => {
    event.preventDefault()

    if(checkName(newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?` )) {
        const personData = persons.find(person => person.name === newName)
        const id = personData.id;
        const updatedPerson = {...personData, number: newNumber}
        const updatedPersons = persons.map(person => person.id === id ? updatedPerson : person)

        personService.updatePerson(id, updatedPerson)
          .then(res => res.ok? setPersons(updatedPersons): setAlertMessage([undefined, "error", res.error]))
          .catch(err => console.error(err))

        return
      } else {
        return
      }
    }

    const nameObject = {
      name: newName,
      number: newNumber,
    }
    
    personService.addPerson(nameObject)
      .then(res => {
        if(res.error) {
          setAlertMessage([undefined, "error", res.error])
        } else {
          setPersons(persons.concat(res))
          setAlertMessage([res.name, "add"])
        }
      })
      .catch(err => {
        console.error(err)
       })

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)
  const deleteHandler = (id) => {
    const name = persons.find(person => person.id === id).name
    const message = `Delete ${name}?`;
    if(window.confirm(message)) {
      const updatedPersons = persons.filter(person => person.id !== id)
      personService.deletePerson(id)
      .then(res => {
        setPersons(updatedPersons);
      })
      .catch(err => setAlertMessage([name, "error"]))
    } else {
      return
    }
  }



  const filterFunc = (persons, filter) => {
    if(filter.length > 0) {
      persons = persons.filter(person => person.name.toLowerCase().includes(filter))
    } 
    return persons.map(person => <Name key={person.id} person={person} deleteHandler={deleteHandler}/>)
  }

  useEffect(() => {
    personService.getAll()
    .then(persons => setPersons(persons))
    .catch(err => console.error(err))
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
        <Message msg={alertMessage} />
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
        {filterFunc(persons,filter)}
    </div>
  )
}

export default App