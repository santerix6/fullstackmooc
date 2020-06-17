const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)

const initialUsers = [
  {
    username : "santerix6",
    name : "Santeri Nuotiomaa",
    password : "mursu123",
  }
]

beforeEach(async () => {
  await User.deleteMany({})

  let userObject = new User(initialUsers[0])
  await userObject.save()

})
test('adding proper new user works', async () => {
  const newUser =
    {
      username : "petskuuu",
      name : "Petteri Nuotiomaa",
      password : "kaljamaha123",
    }
  const res1 = await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
  const res = await api.get('/api/users')
  expect(res.body[res.body.length -1].username).toBe(newUser.username)
})
test('adding faulty new user', async () => {
  const newUser =
    {
      username : "petskuuu",
      name : "Petteri Nuotiomaa",
      password : "23",
    }
    const res1 = await api
      .post('/api/users')
      .send(newUser)
      .expect(401)
})
afterAll(() => {
  mongoose.connection.close()
})
