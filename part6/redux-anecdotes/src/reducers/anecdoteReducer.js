


export const addVote = (id) => {
  return {
    type: "VOTE",
    data: { id }
  }
}

export const newAnecdote = (anecdote) => {
  return {
    type: "NEW_ANECDOTE",
    data: anecdote
  }
}

export const initAnecdotes = (anecdotes) => {
  return {
    type: "INIT_ANECDOTES",
    data: anecdotes
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const initAnecdote = state.find(a => a.id === action.data.id)
      const changedAnecdote = {...initAnecdote, votes: initAnecdote.votes +1}
      return state.map(anecdote => anecdote.id === action.data.id ? changedAnecdote : anecdote)
    case "NEW_ANECDOTE":
        const newAnecdote = action.data
      return [...state, newAnecdote]
    case "INIT_ANECDOTES":
      return action.data
    default:
      return state
  }
}

export default reducer