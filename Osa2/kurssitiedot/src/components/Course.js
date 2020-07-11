import React from 'react'

const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content course = {course} />
        <Total course = {course} />
      </div>
    )
  }
  
  const Header = (props) => {
    return (
      <div>
        <h2>{props.course.name}</h2>
      </div>
    )
  }
  
  const Total = (props) => {
    const sum = props.course.parts.reduce((a, b) => {
      return a + b.exercises
    }, 0)
  
    return (
      <div>
        <p>Total of {sum} exercises</p>
      </div>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
        <div>{props.course.parts.map(p => <Part part = {p.name} key = {p.id} count = {p.exercises}/>)}</div>
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


  export default Course