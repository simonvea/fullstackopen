import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import AnecdoteForm from './components/anecdoteForm'
import AnecdoteList from './components/anecdoteList'
import Notification from './components/Notification'
import Filter from './components/filter'
import anecdoteServices from './services/anecdotes'
import { initAnecdotes } from './reducers/anecdoteReducer'



const App = (props) => {

  useEffect(() => {
    anecdoteServices.getAll().then(props.initAnecdotes)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default connect(null, { initAnecdotes })(App)