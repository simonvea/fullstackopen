import React from 'react'
import { newAnecdote } from '../reducers/anecdoteReducer'


function AnecdoteForm ({ store }) {
  
  const createNewNote = (event) => {
    event.preventDefault();
    
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    store.dispatch(newAnecdote(anecdote))

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