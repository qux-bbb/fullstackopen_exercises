
import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = (props) => {
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const [getAllBooks, result] = useLazyQuery(ALL_BOOKS)
  const [getME, meResult] = useLazyQuery(ME)

  useEffect(() => {
    getME()
    if (meResult.data) {
      setFavoriteGenre(meResult.data.me.favoriteGenre)
    }
    
  }, [meResult.data]) // eslint-disable-line

  useEffect(() => {
    getAllBooks({ variables: { genre: favoriteGenre } })
  }, [result.data]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  if (result.loading || meResult.loading)  {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

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
          {books.map(a =>
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