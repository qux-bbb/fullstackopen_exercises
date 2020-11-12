
import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = (props) => {
  const result = useQuery(ALL_BOOKS, { pollInterval: 2000 })
  const meResult = useQuery(ME)

  if (!props.show) {
    return null
  }

  if (result.loading || meResult.loading)  {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const favoriteGenre = meResult.data.me.favoriteGenre
  const filteredBooks = books.filter(book => book.genres.includes(favoriteGenre))

  return (
    <div>
      <h2>recommendations</h2>

      <div>books in your favorite genre <b>{favoriteGenre}</b></div>

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
    </div>
  )
}

export default Recommend