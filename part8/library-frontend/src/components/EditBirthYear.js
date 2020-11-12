import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BIRTHYEAR } from '../queries'

const EditBirthYear = ({ authorNames }) => {
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')

  const [ editBirthYear ] = useMutation(EDIT_BIRTHYEAR)

  const submit = async (event) => {
    event.preventDefault()

    const birthYearNumber = Number(birthYear)
    
    editBirthYear({ variables: { name: name || authorNames[0], birthYearNumber } })

    setName('')
    setBirthYear('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            {authorNames.map(authorName => 
              <option key={authorName}>{authorName}</option>
            )}
          </select>
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