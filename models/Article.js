const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ArticleSchema = new mongoose.Schema({
  title: {type: String, required: [true, "can't be blank"]},
  content: String,
  comments: Array,
  images: Array,
  author: String,
  publish: Boolean
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

const User = mongoose.model('User', UserSchema);

module.exports = User;