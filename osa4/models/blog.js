const mongoose = require('mongoose')
const logger = require('C:/Users/Santeri/fullstack/fullstackmooc/osa4/utils/logger.js')
const config = require('C:/Users/Santeri/fullstack/fullstackmooc/osa4/utils/config.js')
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true})
  .then( res =>{
    logger.info('connected to MonboDB')
  })
  .catch(error => {
    logger.error('error connecting to MonboDB', error.message)
  })
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})
module.exports = mongoose.model('Blog', blogSchema)
