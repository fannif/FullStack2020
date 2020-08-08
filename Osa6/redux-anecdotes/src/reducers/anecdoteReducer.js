import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const newAnecdote = action.data
      return state.map(anec => anec.id !== id ? anec : newAnecdote).sort((a,b) => b.votes - a.votes)
    case 'NEW_ANECDOTE':
      return [...state, action.data].sort((a,b) => b.votes - a.votes)
    case 'INIT_ANECDOTES':
      return action.data.sort((a,b) => b.votes - a.votes)
    default: return state
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    anecdote = {...anecdote, votes: anecdote.votes + 1}
    const newAnecdote = await anecdoteService.update(anecdote)
    dispatch({
      type: 'VOTE',
      data: newAnecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.create(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer