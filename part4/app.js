const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const config = require('./utils/config')
const blogRouter = require('./controllers/blog')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')


const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogRouter)


module.exports = app