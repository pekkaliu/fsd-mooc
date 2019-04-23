import React from 'react'

const Header = props =>
  <h1>{props.course}</h1>

const Total = ({parts}) => {
  
    const total = parts.reduce((acc, item) => {
      return acc+item.exercises
    },0)
  
  return <p>yhteensä {total} tehtävää</p>
}
  

const Part = props => {
  return (<p>{props.part.name} {props.part.exercises}</p>)  
}

const Content = props => {

  return (
  <div>
    <Part part={props.parts[0]} />
    <Part part={props.parts[1]} />
  </div>
)}

const Course = ({course}) => {
  return (
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
  )
}

const Courses = ({courses}) => {
  let elements = []
  for (let i = 0; i < courses.length; i++) {
    const element = courses[i];
    elements[i] = <Course key={element.id} course={element} />
  }
  
  return elements
}
export default Courses