const blogRouter = require('express').Router()
const Blog = require('C:/Users/Santeri/fullstack/fullstackmooc/osa4/models/blog.js')
const logger = require('C:/Users/Santeri/fullstack/fullstackmooc/osa4/utils/logger.js')
const User = require('C:/Users/Santeri/fullstack/fullstackmooc/osa4/models/user.js')
const jwt = require('jsonwebtoken')

const getToken = (req) => {
  const auth = req.get('authorization')
  logger.info(auth)
  if(auth && auth.toLowerCase().startsWith('bearer ')) {
    return auth.substring(7)
  }
  return null
}
blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {id:1, name:1, username:1})
    response.json(blogs.map(blog => blog.toJSON()))
})
blogRouter.post('/', async (request, response) => {
  logger.info(request.body)

  try {
    const decodedToken = await jwt.verify(request.token, process.env.SECRET)
    if( !request.token || !decodedToken.id){
      return response.status(401).json({error : 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      title : request.body.title,
      author : request.body.author,
      likes : request.body.likes,
      url : request.body.url,
      user : user._id
    })
    try {
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.json(savedBlog.toJSON())
    } catch(error){
      logger.error(error)
      response.status(400).end()
    }
  } catch(error){
      logger.error(error)
      response.status(401).json({error : 'invalid token'})
    }

})
blogRouter.delete('/:id', async (req, res) => {
  try {
    const decodedToken = await jwt.verify(req.token, process.env.SECRET)
    if( !req.token || !decodedToken.id){
      return res.status(401).json({error : 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(req.params.id)
    if (blog.user.toString() === user._id.toString()){
      await Blog.findByIdAndDelete(req.params.id)
      res.status(204).end()
    } else {
      res.status(401).json({error : 'unauthorized delete attempt'})
    }
  } catch(error){
    logger.error(error)
    res.status(401).json({error : 'invalid token'})
  }
})
blogRouter.put('/:id', async (req, res) =>{
  const newblog = req.body
  console.log(newblog)
  try{
    await Blog.findByIdAndUpdate(req.params.id, newblog, {new:true})
    res.status(200).end()
  } catch(error) {
    logger.error(error)
    res.status(400).end()
  }

})
module.exports = blogRouter
