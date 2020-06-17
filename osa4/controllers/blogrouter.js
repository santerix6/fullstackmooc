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
  const savedBlog = await blog.save()
  response.json(savedBlog.toJSON())

})

module.exports = blogRouter
