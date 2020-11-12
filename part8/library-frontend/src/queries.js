import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query getAllBooks($author: String, $genre: String) {
  allBooks(
    author: $author,
    genre: $genre
  ) {
    title
    author {
      name
      born
    }
    published
    genres
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $publishedNumber: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $publishedNumber,
    genres: $genres
  ) {
    title
    author {
      name
    }
    published
    genres
  }
}
`

export const EDIT_BIRTHYEAR = gql`
mutation editAuthor($name: String!, $birthYearNumber: Int!) {
  editAuthor(name: $name, setBornTo: $birthYearNumber)  {
    name
    born
    bookCount
  }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password)  {
    value
  }
}
`

export const ME = gql`
query {
  me {
    username
    favoriteGenre
  }
}
`