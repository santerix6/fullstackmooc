const { ApolloServer, gql , UserInputError,AuthenticationError} = require('apollo-server')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/books')
const User = require('./models/user')
const MONGODB_URI = `mongodb+srv://fullstack:rekka11@sanecluster.d8oqz.mongodb.net/graphql?retryWrites=true&w=majority`
console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch((e) => {
    console.log('error connecting to mongod', e.message);
  })

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
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
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
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]!
  }
  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre:String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]!
    ): Book
    editAuthor(name:String setBornTo:Int): Author
    createUser(
      username : String!
      favoriteGenre: String
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  `


const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: ()  => Book.collection.countDocuments(),
    me: (root, args, context) => {
      return context.currentUser
   },
    allBooks: async (root, args,context) => {

      if(!args.author && !args.genre){
        console.log("asdtesti");
        try{
          const books = await Book.find({}).populate('author')
          
          return books
        } catch(e){
          throw new UserInputError(e.message,{
            invaldiArgs:args,
          })
        }

       } else if (args.genre) {
         console.log(args.genre);
         try{
           const new_list1 = await Book.find({genres:{"$in":[args.genre]}})
           console.log(new_list1);
           return new_list1
         } catch(e){
           throw new UserInputError(e.message,{
             invaldiArgs:args,
           })
         }
       }


  },
    allAuthors: () => Author.find({})

  },
  Author: {
    name: (root) => root.name,
    id: (root) => root.id,
    born: (root) => root.born,
    bookCount: async (root, context) => {
      console.log(root);
      const books = await Book.find({author:root._id})
      console.log(books);
      return books.length
      // const new_list = books.filter(b => b.author === root.name)
      // console.log(new_list.length);
      // return new_list.length
    }
  },
  Mutation: {
    addBook: async (root,args, context) => {
      const currentUser = context.currentUser
      console.log(currentUser);
      if(!currentUser) {
        throw new AuthenticationError("not authed brah")
      }
      const author = await Author.findOneAndUpdate({name:args.author},{expire: new Date()},{upsert:true,new:true})
      console.log(author)
      const book = new Book({title: args.title, author: author, published: args.published, genres: args.genres})
      try {
        await book.save()
        return book
      } catch(e) {
        throw new UserInputError(e.message,{
          invaldiArgs:args,
        })
      }

    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser) {
        throw new AuthenticationError("not authed brah")
      }
      try{
        console.log(args.setBornTo);
        const author = await Author.findOneAndUpdate({name:args.name},{born:args.setBornTo})
        console.log(author);
        return author
      } catch(e) {
        return null
      }
    },
    createUser: async (root, args)=> {
      const user = new User({username: args.username})
      try{
        await user.save()
        return user
      } catch(e){
        throw new UserInputError(e.message,{
          invaldiArgs:args,
      })
    }
  },
  login: async(root, args) =>{
    const user = await User.findOne({username:args.username})
    if(!user || args.password !== 'secret'){
      throw new UserInputError("wrong creds maan")
    }
    const userForToken = {
      username: user.username,
      id: user._id,
    }
    console.log('loginsucces');
    return { value: jwt.sign(userForToken, JWT_SECRET) }
  }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }

})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
