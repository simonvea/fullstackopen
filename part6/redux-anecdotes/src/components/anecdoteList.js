import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotification, removeNotification } from '../reducers/notificationReducer'

function AnecdoteList(props) {
  const toggleNotification = (message) => {
    props.showNotification(message)
    setTimeout(() => props.removeNotification(), 5000)
  }

  const vote = (anecdote) => {
    const message = `You voted '${anecdote.content}'`
    props.addVote(anecdote.id)
    toggleNotification(message)
  }


  return (
    <div>
      {props.anecdotes.sort((a,b) => a.votes < b.votes ? 1 : -1).map(anecdote =>
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

const anecdotesToShow = ({ anecdotes, filter }) => {
  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
}

const mapStateToProps = (state) => {
  return {
    anecdotes: anecdotesToShow(state) 
  }
}

const mapDispatchToProps = {
  showNotification,
  removeNotification,
  addVote,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(AnecdoteList)