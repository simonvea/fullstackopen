const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

router.post('/', async (req, res, next) => {
  const body = req.body

  if(body.username === undefined) {
    return res.status(400).send({error: "missing password or username"})
  } else if(body.password === undefined) {
    return res.status(400).send({error: "missing password or username"})
  } else if (body.password.length < 3) {
    return res.status(400).send({error: "password too short"})
  } else if (body.username.length < 3) {
    return res.status(400).send({error: "username too short"})
  }

  const oldUser = await User.findOne({username: body.username})

  if(oldUser) return res.status(409).send({error: "username must be unique"})

  try {

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    res.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}).populate('posts', {title: 1, url: 1, likes: 1})

    res.send(users.map(user => user.toJSON()))
  } catch(err) {
    next(err)
  }
  
})


module.exports = router