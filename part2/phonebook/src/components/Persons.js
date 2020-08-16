import React from 'react'

const Person = ({ person }) => <p>{person.name} {person.number}</p>

const Persons = (props) => {
  return (
    <>
      {props.filterPersons.map(person =>
        <Person key={person.name} person={person} />
      )}
    </>
  )
}

export default Persons