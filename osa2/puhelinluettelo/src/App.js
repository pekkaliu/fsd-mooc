import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({person}) => <li>{person.name}  {person.number}</li>  

const Persons = ({persons}) => 
  <ul>{persons.map(person => <Person key={person.name} person={person} />)}</ul>

const Filter = ({searchWord, handleSearchChange}) => 
  <p>rajaa näytettäviä: <input value={searchWord} onChange={handleSearchChange} /></p>

const PhonebookForm = ({handleFormSubmit, handleNameChange, handleNumberChange, newName, newNumber}) =>
    <form onSubmit={handleFormSubmit}>
      <div>
        nimi: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>numero: <input value={newNumber} onChange={handleNumberChange} /></div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchWord, setsearchWord ] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleSearchChange = (event) => {
    setsearchWord(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    // Callback 
    // http://adripofjavascript.com/blog/drips/testing-array-contents-with-array-some.html
    const isObjInArray = (element) => element.name === newName;

    if(persons.some(isObjInArray)) {
      alert(`${newName} on jo luettelossa`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  // Case insensitive filter
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
  const filterCallback = (person) =>  RegExp(searchWord,'i').test(person.name)
  const personsToShow = persons.filter(filterCallback)

  return (
    <div>
      <h2>Puhelinluettelo</h2>

      <Filter searchWord={searchWord} handleSearchChange={handleSearchChange} />

      <h3>Lisää uusi</h3>

      <PhonebookForm 
        handleFormSubmit={handleFormSubmit} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        newName={newName} 
        newNumbe={newNumber} 
      />

      <h3>Numerot</h3>

      <Persons persons={personsToShow} />
    </div>
  )

}

export default App