const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const Blog = require('./models/blog')
const User = require('./models/user')
const logger = require('C:/Users/Santeri/fullstack/fullstackmooc/osa4/utils/logger.js')
const blogRouter = require('./controllers/blogrouter')
const userRouter = require('./controllers/userrouter')
const loginRouter = require('./controllers/loginrouter')
const mongoose = require('mongoose')
try {
  mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
  logger.info('connected to MonboDB', config.MONGODB_URI)
  logger.info(process.env.NODE_ENV )
} catch(error)  {
    logger.error('error connecting to MonboDB', error.message)
  }
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
if(process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app
