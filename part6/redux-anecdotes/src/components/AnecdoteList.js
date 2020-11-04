import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const voteAnecdote = (anecdote) => {
    props.vote(anecdote)
    props.setNotification(`you voted '${anecdote.content}'`, 5)
  }

  const filterValue = props.filter.toLowerCase()
  const filtedAnecdotes = props.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filterValue))

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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  vote,
  setNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList