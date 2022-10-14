const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const helper = require('./test_helper.js')

const api = supertest(app)

const Blog = require('../models/blog.js')
const User = require('../models/users.js')


beforeEach(async () => {
  await Blog.deleteMany({})

  //for (let blog of helper.initialBlogs) {
    //let blogObject = new Blog(blog)
    //await blogObject.save()
  //}
  await Blog.insertMany(helper.initialBlogs)

  await User.deleteMany({})
  await User.insertMany(helper.intitialUsers)
})

describe('tests on some intitial blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are five blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(5)
  })

  test('unique identifier property is named properly', async () => {
    const response = await api.get('/api/blogs')
    
    response.body.forEach(blog => expect(blog.id).toBeDefined())
  })
})

describe('tests on adding a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = 
      {
          id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        }
    

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
          'Go To Statement Considered Harmful'
    )
  })

  test('if likes property is missing default to 0', async () => {
    const newBlog = 
      {
          id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          __v: 0
        }
    

    const postResponse = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const id = postResponse.body.id

    const getResponse = await api.get('/api/blogs')

    const [ addedBlog ] = getResponse.body.filter(r => r.id === id)

    expect(addedBlog.likes).toBe(0)
  })

  test('if title or url is missing respond with 400 BAD REQUEST', async () => {
    const newBlog = 
      {
          id: '5a422aa71b54a676234d17f8',
          author: 'Edsger W. Dijkstra',
          likes: 5,
          __v: 0
        }
    
    

    const postResponse = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const getResponse = await api.get('/api/blogs')

    expect(getResponse.body).toHaveLength(helper.initialBlogs.length)

  }, 15000)

  test('update the likes of one blog post with 200 OK, if succesful', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const originalLikes = blogToUpdate.likes
    const modifiedLikes = 999
    blogToUpdate.likes = modifiedLikes
    

    const putResponse = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
    const id = putResponse.request.url.split('/').at(-1)

    const blogsAtEnd = await helper.blogsInDb()
    const [ updatedBlog ] = blogsAtEnd.filter(r => r.id === id)

    expect(updatedBlog.likes).toBe(modifiedLikes)
  })
})


describe('deletion of a blog', () => {
  test('succeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(blog => blog.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('testsuite for user managment', () => {
  test('add a user, respond 201 CREATED if succesful', async () => {
    const usersAtStart = await helper.usersInDb()
    const userToAdd = {
      username: 'addme',
      name: 'Add Me',
      password: 'onemoresecret'
    }

    await api
      .post('/api/users')
      .send(userToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(helper.intitialUsers.length + 1)
  })
  test('if username or password have less than 3 characters, respond with 400 BAD REQUEST', async () => {
    const usersAtStart = await helper.usersInDb()
    const userToAdd = {
      username: 'me',
      name: 'Too Short',
      password: 'pw'
    }

    await api
      .post('/api/users')
      .send(userToAdd)
      .expect(400)
      //.expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
    })
})
    
afterAll(() => {
  mongoose.connection.close()
})
