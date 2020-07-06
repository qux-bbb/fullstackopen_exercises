import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Head = (props) => <h1>{props.text}</h1>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const P = (props) => <p>{props.text} {props.score}</p>

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <Head text="give feedback" />
      <Button handleClick={() => setGood(good+1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad+1)} text="bad" />
      <Head text="statistics" />
      <P text='good' score={good} />
      <P text='neutral' score={neutral} />
      <P text='bad' score={bad} />
      <P text='all' score={good+neutral+bad} />
      <P text='average' score={(good+neutral+bad) / 3} />
      <p>positive {good / (good+neutral+bad) * 100} %</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)