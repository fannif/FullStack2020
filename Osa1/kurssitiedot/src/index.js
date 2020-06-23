import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1 = {part1} part2 = {part2} part3 = {part3} count1 = {exercises1} count2 = {exercises2} count3 = {exercises3} />
      <Total ex1 = {exercises1} ex2 = {exercises2} ex3 = {exercises3} />
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.ex1 + props.ex2 + props.ex3}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part = {props.part1} count = {props.count1}/>
      <Part part = {props.part2} count = {props.count2}/>
      <Part part = {props.part3} count = {props.count3}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.count}</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))