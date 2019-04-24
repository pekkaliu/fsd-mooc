import React from 'react'

const PhonebookForm = ({
    handleFormSubmit, 
    handleNameChange, 
    handleNumberChange, 
    newName, 
    newNumber}) =>
    <form onSubmit={handleFormSubmit}>
      <div>
        nimi: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>numero: <input value={newNumber} onChange={handleNumberChange} /></div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>

export default PhonebookForm