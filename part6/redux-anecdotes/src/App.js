import React from 'react';
import AnecdoteForm from './components/anecdoteForm'
import AnecdoteList from './components/anecdoteList'
import Notification from './components/Notification'
import Filter from './components/filter'


const App = (props) => {


  return (
    <div>
      <Notification store={props.store} />
      <h2>Anecdotes</h2>
      <Filter store={props.store} />
      <AnecdoteList store={props.store} />
      <AnecdoteForm store={props.store} />
    </div>
  )
}

export default App