const mongoose = require('mongoose')

var batismoSchema = new mongoose.Schema({
    _id: String,
    date: String,
    pai: String,
    mae: String,
    title: String,
    ref: String,
    href: String
  });

module.exports = mongoose.model('batismo', batismoSchema)