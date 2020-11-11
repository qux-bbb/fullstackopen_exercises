const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

const MONGODB_URI = 'mongodb+srv://fullstack:forfullstackopen@cluster0.9gxez.mongodb.net/library?retryWrites=true'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const tmpBooks = await Book.find({}).populate('author')
      if (args.author && args.genre){
        return tmpBooks.filter(book =>
          book.author.name === args.author &&book.genres.includes(args.genre)
        )
      }
      if (args.author){
        return tmpBooks.filter(book => book.author.name === args.author)
      }
      if (args.genre){
        return tmpBooks.filter(book => book.genres.includes(args.genre))
      }
      return Book.find({}).populate('author')
    },
    allAuthors: async () => Author.find({})
  },

  Author: {
    bookCount: async (root) => {
      const theAuthorBooks = await Book.find({author: root._id})
      return theAuthorBooks.length
    }
  },

  Mutation: {
    addBook: async (root, args) => {
      let authorId = null
      const author = await Author.find({name: args.author})
      if (author.length === 0) {
        const newAuthor = new Author({name: args.author})
        authorId = newAuthor._id
        try {
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      } else {
        authorId = author._id
      }
      const book = new Book({ ...args, author: authorId })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      const returnedBook = await Book.findOne({title: args.title}).populate('author')
      return returnedBook
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({name: args.name})
      author.born = args.setBornTo
      return author.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})