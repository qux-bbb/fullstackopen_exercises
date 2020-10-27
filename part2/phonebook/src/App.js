import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Notification from './components/Notification'
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterValue, setfilterValue] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [theMessage, setTheMessage] = useState(null)
  const [messageType, setMessageType] = useState('info')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    let already_added = false
    for (let index = 0; index < persons.length; index++) {
      if (newName === persons[index].name) {
        already_added = true
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          const personObject = {
            name: newName,
            number: newNumber
          }
          personService
            .update(persons[index].id, personObject)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== persons[index].id ? person : returnedPerson))
              setNewName('')
              setNewNumber('')
              setTheMessage(`Updated ${newName}'s number`)
              setMessageType('info')
              setTimeout(() => {
                setTheMessage(null)
              }, 5000)
            })
            .catch(error => {
              setTheMessage(`Information of ${newName} has already been removed from server`)
              setMessageType('error')
              setTimeout(() => {
                setTheMessage(null)
              }, 5000)
            })
        }
        break
      }
    }

    if (already_added)
      console.log(`${newName} is already added to phonebook`)
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setTheMessage(`Added ${newName}`)
          setMessageType('info')
          setTimeout(() => {
            setTheMessage(null)
          }, 5000)
        })
        .catch(error => {
          setTheMessage(error.response.data.error)
          setMessageType('error')
          setTimeout(() => {
            setTheMessage(null)
          }, 5000)
          
        })
    }
  }

  const handlefilterValueChange = (event) => {
    console.log(event.target.value)
    setfilterValue(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const deletePerson = person => {
    if(window.confirm(`Delete ${person.name}?`)){
      personService
      .deleteOne(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
      .catch(error => {
        setTheMessage(`Information of ${newName} has already been removed from server`)
        setMessageType('error')
        setTimeout(() => {
          setTheMessage(null)
        }, 5000)
      })
    }

  }

  const filterPersons = persons.filter(person => person.name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={theMessage} messageType={messageType} />
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
      {filterPersons.map((person, i) =>
        <Person
          key={i}
          person={person}
          deletePerson={() => deletePerson(person)}
        />
      )}
    </div>
  )
}

export default App