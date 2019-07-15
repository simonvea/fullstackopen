import React from 'react'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification} from '../reducers/notificationReducer'

function AnecdoteForm (props) {
  
  const createNewNote = async (event) => {
    event.preventDefault();
    
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''

    props.newAnecdote(anecdote)

    const message = `Added '${anecdote}'`
    props.setNotification(message, 5)
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
  setNotification,
  newAnecdote
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)