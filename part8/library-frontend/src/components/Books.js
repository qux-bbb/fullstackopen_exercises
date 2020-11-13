import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const CurrentGenre = ({ selectedGenre }) => {
  if ( !selectedGenre ) {
    return null
  }

  return (
    <div>in genre <b>{selectedGenre}</b></div>
  )
}

const Books = (props) => {
  const result = useQuery(ALL_BOOKS, {pollInterval: 2000})
  const [selectedGenre, setSelectedGenre] = useState(null)

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  let allGenres = []
  books.forEach(book => {
    book.genres.forEach(genre => {
      if (!allGenres.includes(genre))
      allGenres = allGenres.concat(genre)
    })
  })
  let filteredBooks = []
  if (selectedGenre)
    filteredBooks = books.filter(book => book.genres.includes(selectedGenre))
  else
    filteredBooks = books

  return (
    <div>
      <h2>books</h2>

      <CurrentGenre selectedGenre={selectedGenre} />

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )} 
        </tbody>
      </table>
      <div>
        {allGenres.map(genre => 
          <button key={genre} onClick={() => setSelectedGenre(genre)}>{genre}</button>
        )}
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books