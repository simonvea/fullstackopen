import React from 'react';
import AnecdoteForm from './components/anecdoteForm'
import AnecdoteList from './components/anecdoteList'


const App = (props) => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList store={props.store} />
      <AnecdoteForm store={props.store} />
    </div>
  )
}

export default App