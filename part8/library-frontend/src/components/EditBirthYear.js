import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const EDIT_BIRTHYEAR = gql`
mutation editAuthor($name: String!, $birthYearNumber: Int!) {
  editAuthor(name: $name, setBornTo: $birthYearNumber)  {
    name
    born
    bookCount
  }
}
`

const EditBirthYear = () => {
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')

  const [ editBirthYear ] = useMutation(EDIT_BIRTHYEAR)

  const submit = async (event) => {
    event.preventDefault()

    const birthYearNumber = Number(birthYear)
    
    editBirthYear({ variables: { name, birthYearNumber } })

    setName('')
    setBirthYear('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>

  )
}

export default EditBirthYear