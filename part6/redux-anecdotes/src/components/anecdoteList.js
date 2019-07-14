import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'

function AnecdoteList({ store }) {

  const anecdotes = store.getState()

  const vote = (id) => {
    store.dispatch(addVote(id))
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList