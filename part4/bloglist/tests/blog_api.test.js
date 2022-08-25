const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')

const api = supertest(app)

const Blog = require('../models/blog.js')

const initialBlogs = [
    {
      id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  //for (let blog of initialBlogs) {
    //let blogObject = new Blog(blog)
    //await blogObject.save()
  //}
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are six blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(6)
})

test('unique identifier property is named properly', async () => {
  const response = await api.get('/api/blogs')
  
  response.body.forEach(blog => expect(blog.id).toBeDefined())
})

//test('a valid blog can be added', async () => {
  //const newBlog = [
    //{
        //id: '5a422aa71b54a676234d17f8',
        //title: 'Go To Statement Considered Harmful',
        //author: 'Edsger W. Dijkstra',
        //url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        //likes: 5,
        //__v: 0
      //}
  //]

  //await api
    //.post('/api/blogs')
    //.send(newBlog)
    //.expect(201)
    //.expect('Content-Type', /application\/json/)

  //const response = await api.get('/api/blogs')

  //const titles = response.body.map(r => r.title)

  ////expect(response.body).toHaveLength(initialBlogs.length + 1)
  //expect(titles).toContain(
        //'Go To Statement Considered Harmful'
  //)
//})

afterAll(() => {
  mongoose.connection.close()
})
