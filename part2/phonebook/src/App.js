import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', show: true },
    { name: 'Ada Lovelace', number: '39-44-5323523', show: true },
    { name: 'Dan Abramov', number: '12-43-234345', show: true },
    { name: 'Mary Poppendieck', number: '39-23-6423122', show: true }
  ])
  const [filterValue, setfilterValue] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    let already_added = false
    for (let index = 0; index < persons.length; index++) {
      if (newName === persons[index].name) {
        already_added = true
        break
      }
    }

    if (already_added)
      window.alert(`${newName} is already added to phonebook`)
    else {
      const personObject = {
        name: newName,
        number: newNumber,
        show: true
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handlefilterValueChange = (event) => {
    console.log(event.target.value)
    setfilterValue(event.target.value)
    for (let index = 0; index < persons.length; index++) {
      let lowerfilterValue = event.target.value.toLowerCase()
      let lowerPersonName = persons[index].name.toLowerCase()
      if(lowerPersonName.indexOf(lowerfilterValue) !== -1)
        persons[index].show = true
      else
        persons[index].show = false
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const filterPersons = persons.filter(person => person.show === true)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} handlefilterValueChange={handlefilterValueChange} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons filterPersons={filterPersons}/>
    </div>
  )
}

export default App