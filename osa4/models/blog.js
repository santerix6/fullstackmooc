const mongoose = require('mongoose')
const logger = require('C:/Users/Santeri/fullstack/fullstackmooc/osa4/utils/logger.js')
const config = require('C:/Users/Santeri/fullstack/fullstackmooc/osa4/utils/config.js')
const mongoUrl = config.MONGODB_URI

const blogSchema = mongoose.Schema({
  title: {type: String, required : true},
  author: String,
  url: {type: String, required : true},
  likes: {type: Number, default: 0}
})
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
