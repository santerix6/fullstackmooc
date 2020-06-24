const blogRouter = require('express').Router()
const Blog = require('C:/Users/Santeri/fullstack/fullstackmooc/osa4/models/blog.js')
const logger = require('C:/Users/Santeri/fullstack/fullstackmooc/osa4/utils/logger.js')
const User = require('C:/Users/Santeri/fullstack/fullstackmooc/osa4/models/user.js')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs.map(blog => blog.toJSON()))
})
blogRouter.post('/', async (request, response) => {
  logger.info(request.body)
  const user = await User.find().sort({ _id: -1 }).limit(1)
  const blog = new Blog({
    title : request.body.title,
    author : request.body.author,
    likes : request.body.likes,
    url : request.body.url,
    user : user[0]
  })
  try {
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  } catch(error){
    logger.error(error)
    response.status(400).end()
  }
})
blogRouter.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch(error){
    logger.error(error)
    res.status(400).end()
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
