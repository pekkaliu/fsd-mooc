import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
          {
            name: 'Reactin perusteet',
            exercises: 10
          },
          {
            name: 'Tiedonvälitys propseilla',
            exercises: 7
          },
          {
            name: 'Komponenttien tila',
            exercises: 14
          }
        ]
      }

  const Header = (props) => (
    <h1>{props.course}</h1>
  )

  const Part = (props) => (
    <p>
        {props.part.name} {props.part.exercises}
    </p>
  )

  const Content = (props) => 
      <>
        {props.parts.map(part => <Part key={part.name} part={part} />)}
    </>
  

  const Total = (props) => (
    <p>yhteensä {
        props.parts.reduce((acc, currPart ) => {
        return acc + currPart.exercises
      },0)
    } tehtävää</p>
  )

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))