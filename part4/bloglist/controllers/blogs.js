const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')

//blogsRouter.get('/', (request, response) => {
  //Blog
    //.find({})
    //.then(blogs => {
      //response.json(blogs)
    //})
//})

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name:1 })
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
  const body = request.body
  const title = body.title
  const url = body.url
  const author = body.author
  //const user = await User.findById(body.userId)
  const user = await User.findOne()
  //console.log(body)

  if (!title || !url || !user) {
    response.status(400).end()
  } else {
    //const blog = new Blog(request.body)
    const blog = new Blog({
      title: title,
      url: url,
      author: author,
      user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    //console.log(response)
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
