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
    ...req.body,
    likes: req.body.likes || 0,
  }

  const blog = new Blog(post)

  const result = await blog.save()

  res.status(201).send(result.toJSON())

})

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  await Blog.findByIdAndDelete(id)

  res.status(204).end()

})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const post = {
    ...req.body,
    likes: req.body.likes || 0,
  }

  const response = await Blog.findByIdAndUpdate(id, post, { new: true })

  res.send(response.toJSON())
})

module.exports = router
