import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const newAnecdote = () => { 
    const selected2 = getRandom(props.anecdotes.length)
    setSelected(selected2)
  }

  const [most, setMost] = useState(0)
  const [votes, setVotes] = useState(new Uint16Array(props.anecdotes.length))
  var max = votes[most]
  
  const increaseVote = () => {
    const votesCopy = {...votes}
    votesCopy[selected] += 1
    
    if (votesCopy[selected] > max) {
      max = votesCopy[selected]
      setMost(selected)
    }
    setVotes(votesCopy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <Button handleClick = {increaseVote} text = 'Vote' />
      <Button handleClick = {newAnecdote} text = 'Next anecdote' />
      <h1>Anecdote with the most votes</h1>
      <p>{props.anecdotes[most]}</p>
      <p>Has {votes[most]} votes</p>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const getRandom = (under) => {
  return (
      Math.floor(Math.random() * Math.floor(under))
    )
}

const getIndexOfMax = (votes) => {
  var max = votes[0]
  var index = 0
  for (var i = 1; i < votes.length; i++) {
    if (votes[i] >= max) {
      index = i
      max = votes[i]
    }
  }
  return (
    index
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