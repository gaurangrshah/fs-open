const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
 * However, for simplicity, we will store the author's name in connection with the book
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]



const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    published: Int!
    author: String!
    genres: [String!]
  }

  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book]!
    findBook: Book
    authorCount: Int!
    allAuthors: [Author]!
    findAuthor: Author
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ) : Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    allBooks: (root, args) => {
      if(args.author && args.genre) {
        return books.filter((b) => b.author === args.author).filter((b) => b.genres.includes(args.genre))
      }
      if(args.author) {
        return books.filter((b) => b.author === args.author)
      }
      if(args.genre) {
        return books.filter((b) => b.genres.includes(args.genre))
      }
      return books
    },
    findBook: (root, args) => {
      return books.find(b => b.title === args.title)
    },
    authorCount: () => authors.length,
    allAuthors: () => authors,
    findAuthor: (root, args) => {
      return authors.find(a => a.name === args.name)
    }
  },
  Author: {
    bookCount: async(root) => {
      return books.filter((b) => b.author === root.name).length
    }
  },
  Mutation: {
    addBook: (root, args) => {
      // @TODO:  use UserInputError to handle duplicate title
      if(books.find((b) => b.title === args.title)) {
        throw new UserInputError('Duplicate title not valid', {invalidArgs: args.title})
      }
      const book = {...args, id: uuid()}
      books = books.concat(book)
      if (!authors.some((a) => a.name === args.author)) {
        console.log('found new author - adding to graph')
        const author = {name: args.author, id: uuid()}
        authors = authors.concat(author)
      }
      return book
    },
    editAuthor: (root, args) => {
      console.log('running mutation')
      const author = authors.find((a) => a.name === args.name)
      if(!author) return null
      const updatedAuthor = {...author, born: args.setBornTo}
      console.log('author exissts, updated DOB', updatedAuthor)
      return updatedAuthor
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
