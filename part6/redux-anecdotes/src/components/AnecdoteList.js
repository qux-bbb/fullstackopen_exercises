import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  const voteAnecdote = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(notificationChange(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(notificationChange(null))
    }, 5000)
  }

  const filterValue = useSelector(state => state.filter).toLowerCase()
  const filtedAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filterValue))

  filtedAnecdotes.sort((a, b) => b.votes - a.votes)

  return(
    <div>
      {filtedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList