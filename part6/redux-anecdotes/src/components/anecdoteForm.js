import React from 'react'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, removeNotification } from '../reducers/notificationReducer'


function AnecdoteForm ({ store }) {

  const toggleNotification = (message) => {
    store.dispatch(showNotification(message))
    setTimeout(() => store.dispatch(removeNotification()), 5000)
  }
  
  const createNewNote = (event) => {
    event.preventDefault();
    
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    store.dispatch(newAnecdote(anecdote))

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

export default AnecdoteForm