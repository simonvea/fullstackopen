const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const helper = require('./test_helpers')
const User = require('../models/user')

const api = supertest(app)


describe('user testing', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const baseUser = {
      username: "root",
      name: "root",
      password: "123415125"
    }

    await new User(baseUser).save()
  })

  it('creates a new user', async () => {
      const newUser = {
          username: "testuser",
          name: "simon",
          password: '123456',
      }

      const users = await helper.usersInDb()
      await api.post('/api/users').send(newUser)
          .expect(200)

      const updated = await helper.usersInDb()
      expect(updated.length).toBe(users.length +1)
  })

  describe('validates user creation', () => {
    it('rejects no username', async () => {
      const newUser = {
        name: "simon",
        password: '123456',
      }

      const users = await helper.usersInDb()
      const response = await api.post('/api/users').send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

      expect(response.body).toEqual({error: "missing password or username"})
      
      const updated = await helper.usersInDb()
      expect(updated.length).toBe(users.length)
    })

    it('rejects no password', async () => {
      const newUser = {
        username: "testuser",
        name: "simon",
      }

      const users = await helper.usersInDb()
      const response = await api.post('/api/users').send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

      expect(response.body).toEqual({error: "missing password or username"})

      const updated = await helper.usersInDb()
      expect(updated.length).toBe(users.length)
    })

    it('rejects passwords with less than three characters', async () => {
      const newUser = {
        username: "testuser",
        name: "simon",
        password: '12',
      }

      const users = await helper.usersInDb()
      const response = await api.post('/api/users').send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

      expect(response.body).toEqual({error: "password too short"})

      const updated = await helper.usersInDb()
      expect(updated.length).toBe(users.length)
    })

    it('rejects usernames with less than three characters', async () => {
      const newUser = {
        username: "te",
        name: "simon",
        password: '1234567',
      }

      const users = await helper.usersInDb()
      const response = await api.post('/api/users').send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

      expect(response.body).toEqual({error: "username too short"})

      const updated = await helper.usersInDb()
      expect(updated.length).toBe(users.length)
    })

    it('rejects same username', async () => {
      const newUser = {
        username: "testuser",
        name: "simon",
        password: '12456789',
      }
      
      await api.post('/api/users').send(newUser)
      const users = await helper.usersInDb()

      const response = await api.post('/api/users').send(newUser)
          .expect(409)
          .expect('Content-Type', /application\/json/)

      expect(response.body).toEqual({error: "username must be unique"})

      const updated = await helper.usersInDb()
      expect(updated.length).toBe(users.length)
    })

  })

})

afterAll((done) => {
  mongoose.connection.close()
  done()
})
