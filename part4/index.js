const express = require('express')
const cors = require('cors')
const blogRouter = require('./controllers/blog')
const config = require('./utils/config')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})