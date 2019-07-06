import React from 'react'

const Header = (props) => {
    return (
      <h2>{props.course}</h2>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
          {props.part} {props.exercises}
      </p>
    )
  }
  
  const Content = ({parts}) => {
    const partsComponents = parts.map(part => <Part part={part.name} exercises={part.exercises} key={part.id} />)
    return (
      <main>
        {partsComponents}
      </main>
    )
  }
  
  const Total = ({parts}) => {
    const sum = parts.reduce((total, curr) => total += curr.exercises, 0)
    return (
      <h4>Number of exercises {sum}</h4>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }

  export default Course