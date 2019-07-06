import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))
  const [mostVotedIndex, setMostVotedIndex] = useState(0)


  const randNumber = Math.floor(Math.random() * props.anecdotes.length);
  const addVote = (selected) => {
    const copy = [...votes];
    copy[selected] +=1;
    setVotes(copy);
    updateMostVotes();
  };

  const updateMostVotes = () => {
      const vote = Math.max(...votes);
      const index = votes.findIndex((el) => el === vote);
      setMostVotedIndex(index);
  }

  return (
    <div>
        <h1>Anecdote of the day</h1>
        <p>
            {props.anecdotes[selected]} has {votes[selected]} votes
        </p>
        <button onClick={() => addVote(selected)}>vote</button>
        <button onClick={() => setSelected(randNumber)}>next anecdote</button>
        <h1>Anecdote with most votes</h1>
        <p>
            {props.anecdotes[mostVotedIndex]} has {votes[mostVotedIndex]} votes
        </p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)