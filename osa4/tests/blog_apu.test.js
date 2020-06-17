const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const initialNotes = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Go To Hell',
    author: 'Edsger W. alfa',
    url: 'http://www.u.ads.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
]
beforeEach(async () => {
  await Blog.deleteMany({})

  let noteObject = new Blog(initialNotes[0])
  await noteObject.save()

  noteObject = new Blog(initialNotes[1])
  await noteObject.save()
})
test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('size is equal to intitialnotes', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialNotes.length)
})
test('the id tag is used to define', async () =>{
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})
test('post request rises the blogs size by one and right blog is added to the db', async () => {
  const newBlog = {
    title : 'maailman komein mies',
    author : 'santeri',
    url : 'www.lolesports.com',
    likes : 1488
  }
  const res = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
  const res1 = await api.get('/api/blogs')
  expect(res1.body).toHaveLength(initialNotes.length + 1)
  //testataan onko uusimman title sama kuin lisätyn title.
  expect(res1.body[res1.body.length-1].title).toBe(newBlog.title)
})
test('if newBlog has no likes its value is 0', async() => {
  const newBlog = {
    title : 'maailman komein mies',
    author : 'santeri',
    url : 'www.lolesports.com'
  }
  const res = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
  const res1 = await api.get('/api/blogs')
  expect(res1.body[res1.body.length-1].likes).toBe(0)
})
test('if newblog doesnt include title or url should return 400', async () => {
  const newBlog = {
    author : 'santeri',
    likes : 1488
  }
  const res = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})
test('testing delete with good value', async () => {
  const newBlog = {
    title : 'maailman komein mies',
    author : 'santeri',
    url : 'www.lolesports.com',
    likes : 1488
  }
  const res = await api
    .post('/api/blogs')
    .send(newBlog)
  const res1 = await api.get('/api/blogs')
  const id = res1.body[res1.body.length-1].id
  const res2 = await api.delete(`/api/blogs/${id}`)
    expect(204)
  const res3 = await api.get('/api/blogs')
    expect(res3.body.length).toBe(initialNotes.length)
})
test('testind update with good values', async() => {
  const newBlog = {
    title : 'maailman komein mies',
    author : 'santeri',
    url : 'www.lolesports.com',
    likes : 1488
  }
  const res = await api.get('/api/blogs')
  const id = res.body[0].id
  console.log(id);
  const res2 = await api
    .put(`/api/blogs/${id}`)
    .send(newBlog)
    .expect(200)
})
afterAll(() => {
  mongoose.connection.close()
})
