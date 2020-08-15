import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const AnecdoteAndPoint = (props) => (
  <>
    <h1>{props.title}</h1>
    <div>{props.anecdote}</div>
    <div>has {props.point} votes</div>
  </>
)

const AnecdoteMostPoints = (props) => {
  let most = 0
  let most_index = 0
  for (let index = 0; index < props.points.length; index++)
    if (most < props.points[index]) {
      most = props.points[index]
      most_index = index
    }
  return (
    <>
      <AnecdoteAndPoint 
        title='Anecdote with most votes' 
        anecdote={props.anecdotes[most_index]} 
        point={most} 
      />
    </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [cur_point, setPoint] = useState(0)

  return (
    <>
      <AnecdoteAndPoint 
        title='Anecdote of the day' 
        anecdote={props.anecdotes[selected]} 
        point={props.points[selected]}
      />
      <Button handleClick={() => setPoint(props.points[selected] = props.points[selected] + 1 )} text='vote' />
      <Button handleClick={() => setSelected(parseInt(Math.random() * anecdotes.length))} text='next anecdote' />

      <AnecdoteMostPoints anecdotes={props.anecdotes} points={points} />
    </>
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

const points = Array(anecdotes.length).fill(0)

ReactDOM.render(
  <App anecdotes={anecdotes} points={points} />,
  document.getElementById('root')
)