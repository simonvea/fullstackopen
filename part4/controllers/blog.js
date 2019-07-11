const router = require('express').Router()
const Blog = require('../models/blog')


router.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    const jsoned = blogs.map(blog => blog.toJSON())

    res.send(jsoned)
})

router.post('/', async (req, res) => {

  if(req.body.url === undefined || req.body.title === undefined) {
    return res.status(400).end()
  }

  const post = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes || 0,
  }

  const blog = new Blog(post)

  const result = await blog.save()

  res.status(201).send(result.toJSON())

})

module.exports = router
