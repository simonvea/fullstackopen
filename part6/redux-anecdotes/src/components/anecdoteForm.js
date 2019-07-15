import React from 'react'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, removeNotification } from '../reducers/notificationReducer'


function AnecdoteForm (props) {

  const toggleNotification = (message) => {
    props.showNotification(message)
    setTimeout(() => props.removeNotification(), 5000)
  }
  
  const createNewNote = (event) => {
    event.preventDefault();
    
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.newAnecdote(anecdote)

    const message = `Added '${anecdote}'`
    toggleNotification(message)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNewNote}>
        <div>
          <label> Anecdote:
          <input name="anecdote" type="text" />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
  
}

const mapDispatchToProps = {
  showNotification,
  removeNotification,
  newAnecdote
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)