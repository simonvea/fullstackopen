const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

router.post('/:id/comments', async (req, res) => {
  const postId = req.params.id

  const post = await Blog.findById(postId)
  const parsedPost = post.toJSON()
  const comments = parsedPost.comments

  const updatedPost = {
    ...parsedPost,
    comments: [...comments, req.body.comment]
  }

  const response = await Blog.findByIdAndUpdate(postId, updatedPost, { new: true })

  res.send(response.toJSON())

})


router.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    const jsoned = blogs.map(blog => blog.toJSON())

    res.send(jsoned)
})

router.post('/', async (req, res, next) => {

  if(req.body.url === undefined || req.body.title === undefined) {
    return res.status(400).end()
  }

  
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const users = await User.find({})
    const user = users[0]

    //const user = await User.findById(req.body.userId)

    const post = {
      ...req.body,
      likes: req.body.likes || 0,
      user: user._id,
    }

    const blog = new Blog(post)

    const result = await blog.save()

    user.posts = user.posts.concat(result._id)
    await user.save()

    res.status(201).send(result.toJSON())
  } catch(err) {
    next(err)
  }

})

router.delete('/:id', async (req, res) => {

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

  const userId = decodedToken.id
  const postId = req.params.id

  const post = await Blog.findById(postId)
  if(post.user.toString() !== userId.toString()) {
    return res.status(401).json({ error: 'invalid user'})
  }

  await Blog.findByIdAndDelete(postId)

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
