const mongoose = require('mongoose')
const logger = require('C:/Users/Santeri/fullstack/fullstackmooc/osa4/utils/logger.js')
const config = require('C:/Users/Santeri/fullstack/fullstackmooc/osa4/utils/config.js')
const mongoUrl = config.MONGODB_URI
try {
  mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true})
  logger.info('connected to MonboDB', mongoUrl)
} catch(error)  {
    logger.error('error connecting to MonboDB', error.message)
  }
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Blog', blogSchema)
