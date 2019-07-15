import anecdoteServices from '../services/anecdotes'


export const addVote = (object) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteServices.addVote(object)
    
    dispatch({
      type: "VOTE",
      data: { id: newAnecdote.id }
    })
  }
}

export const newAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteServices.createNew(anecdote)
    
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote
    })
  }
}

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteServices.getAll()

    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    })
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