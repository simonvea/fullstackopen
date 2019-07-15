import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

function AnecdoteList(props) {

  const vote = (anecdote) => {
    const message = `You voted '${anecdote.content}'`
    props.addVote(anecdote)
    props.setNotification(message, 5)
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
  setNotification,
  addVote,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(AnecdoteList)