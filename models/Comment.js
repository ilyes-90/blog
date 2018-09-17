const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const CommentSchema = new mongoose.Schema({
  content: {type: String, required: [true, "can't be blank"]},
  likes: Number,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  publish: Boolean
}, {timestamps: true});

ArticleSchema.plugin(uniqueValidator, {message: 'is already taken.'});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;