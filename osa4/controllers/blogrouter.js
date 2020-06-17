const blogRouter = require('express').Router()
const Blog = require('C:/Users/Santeri/fullstack/fullstackmooc/osa4/models/blog.js')
const logger = require('C:/Users/Santeri/fullstack/fullstackmooc/osa4/utils/logger.js')
blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})
blogRouter.post('/', async (request, response) => {
  logger.info(request.body)
  const blog = new Blog(request.body)
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
