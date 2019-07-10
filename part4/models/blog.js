const mongoose = require('mongoose');
const config = require('../utils/config')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
  module.exports = mongoose.model('Blog', blogSchema)