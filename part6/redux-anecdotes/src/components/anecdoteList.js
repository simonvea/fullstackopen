import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotification, removeNotification } from '../reducers/notificationReducer'

function AnecdoteList({ store }) {

  const anecdotes = store.getState().anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(store.getState().filter))

  const toggleNotification = (message) => {
    store.dispatch(showNotification(message))
    setTimeout(() => store.dispatch(removeNotification()), 5000)
  }

  const vote = (anecdote) => {
    const message = `You voted '${anecdote.content}'`
    store.dispatch(addVote(anecdote.id))
    toggleNotification(message)
  }


  return (
    <div>
      {anecdotes.sort((a,b) => a.votes < b.votes ? 1 : -1).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList