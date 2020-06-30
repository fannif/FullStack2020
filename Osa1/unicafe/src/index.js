import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <div><Header text = 'Give feedback' /></div>
      <div>
        <Button handleClick = {increaseGood} text = 'good' />
        <Button handleClick = {increaseNeutral} text = 'neutral' />     
        <Button handleClick = {increaseBad} text = 'bad' />
      </div>
      <div>
        <Header text = 'Statistics' />
        <Statistics good = {good} neutral = {neutral} bad = {bad} />
      </div>
    </div>
  )
}

const Statistics = (props) => {
  const sum = props.good + props.neutral + props.bad

  if (sum == 0) {
    return (<div><p>No feedback given yet</p></div>)
  }

  const positive = props.good / sum * 100 + ' %'

  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine text = 'Good' value = {props.good} />
          <StatisticsLine text = 'Neutral' value = {props.neutral} />
          <StatisticsLine text = 'Bad' value = {props.bad} />
          <StatisticsLine text = 'All' value = {sum} />
          <StatisticsLine text = 'Average' value = {(props.good + props.bad * (-1)) / (props.good + props.neutral + props.bad)} />
          <StatisticsLine text = 'Positive' value = {positive} />
        </tbody>
      </table>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick = {props.handleClick}>
      {props.text}
    </button>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td><td>{props.value}</td>
    </tr>
  )
}

const Average = (props) => {
  const sum = props.good + props.neutral + props.bad
  if (sum == 0) {
    return (
      <div>
        <p>Average 0</p>
      </div>
    )
  }
  return (
    <div>
      <p>Average {(props.good + props.bad * (-1)) / (props.good + props.neutral + props.bad)}</p>
    </div>
  )
}

const Positive = (props) => {
  const sum = props.good + props.neutral + props.bad
  if (sum == 0) {
    return (
      <div>
        <p>Positive: No responses yet</p>
      </div>
    )
  }
  return (
    <div>
      <p>Positive {props.good / sum * 100} %</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)