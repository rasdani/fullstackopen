const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const helper = require('./test_helper.js')

const api = supertest(app)

const Blog = require('../models/blog.js')


beforeEach(async () => {
  await Blog.deleteMany({})

  //for (let blog of helper.initialBlogs) {
    //let blogObject = new Blog(blog)
    //await blogObject.save()
  //}
  await Blog.insertMany(helper.initialBlogs)
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
    

    const post_response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const id = post_response.body.id

    const get_response = await api.get('/api/blogs')

    const [ addedBlog ] = get_response.body.filter(r => r.id === id)

    //expect(addedBlog.title).toBe('Go To Statement Considered Harmful')
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
    
    

    const post_response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const get_response = await api.get('/api/blogs')

    expect(get_response.body).toHaveLength(helper.initialBlogs.length)

  }, 15000)
})

//desrscribe('deletion of a blog', () => {
  //test('succeds with status code 204 if id is valid', async () => {
    
afterAll(() => {
  mongoose.connection.close()
})
