const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//blogsRouter.get('/', (request, response) => {
  //Blog
    //.find({})
    //.then(blogs => {
      //response.json(blogs)
    //})
//})

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

//blogsRouter.post('/', (request, response) => {
  //const blog = new Blog(request.body)

  //blog
    //.save()
    //.then(result => {
      //response.status(201).json(result)
    //})
//})

blogsRouter.post('/', async (request, response) => {
  const title = request.body.title
  const url = request.body.url

  if (!title || !url) {
    response.status(400).end()
  } else {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const id = request.params.id
  const update = { likes: body.likes }

  const blog = new Blog(body)

  await Blog.findByIdAndUpdate(id, update, { new: true})
  response.status(200).end()
})

module.exports = blogsRouter
