import React, { useState, useEffect } from 'react'
import personService from './services'

// components
import PhonebookForm from './components/PhonebookForm'

const Person = ({person, deletePerson}) => 
  <li>
    {person.name}  {person.number} {person.id}
    <button value={person.id} onClick={deletePerson} >poista</button>
  </li>  

const Persons = ({persons, deletePerson}) => 
  <ul>{persons.map(person => <Person key={person.name} person={person} deletePerson={deletePerson}/>)}</ul>

const Filter = ({searchWord, handleSearchChange}) => 
  <p>rajaa näytettäviä: <input value={searchWord} onChange={handleSearchChange} /></p>


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchWord, setsearchWord ] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
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

  const deletePerson = event => {
    const id = parseInt(event.target.value)
    const personToDelete = persons.find(p => p.id === id )

    if(window.confirm(`Haluatko poistaa ${personToDelete.name}`))
      personService
        .deleteRecord(id)
        .then( data => 
          setPersons(persons.filter(person => person.id !== id))
        )
        
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    // Callback 
    // http://adripofjavascript.com/blog/drips/testing-array-contents-with-array-some.html
    const isObjInArray = (element) => element.name === newName;

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if(persons.some(isObjInArray)) {
      if(window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)){
        // Etsitään päivitettävän yhteystiedon id
        const id = persons.filter(p => p.name === newName)[0].id
        personService
          .update(id, newPerson)
          .then(apiPerson =>
              setPersons(persons.map(person => 
                person.id !== apiPerson.id ? person : apiPerson))
            )
        setNewName('')
        setNewNumber('')
      }
    } else {
      personService
        .create(newPerson)
        .then(apiPerson => 
          setPersons(persons.concat(apiPerson))
        )
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
        newNumber={newNumber} 
      />

      <h3>Numerot</h3>

      <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )

}

export default App