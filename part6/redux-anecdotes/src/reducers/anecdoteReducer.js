import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
      case 'INIT_ANECDOTES':
        return action.data
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes+1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote
      )
    default:
      return state
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = {...anecdote, votes: anecdote.votes+1}
    await anecdoteService.update(newAnecdote)
    dispatch({
      type: 'VOTE',
      data: { id: anecdote.id }
    })
  }
}

export default anecdoteReducer