const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlEncoded = bodyParser.urlencoded({ extended: false });
const app = express();

require('./models/User');

var main = require('./components/main');
var auth = require('./components/auth');
var article = require('./components/article');
var comment = require('./components/comment');

app.set('view engine', 'pug');

app.use(jsonParser);
app.use(urlEncoded);
app.use('/', main);
app.use('/user', auth);
app.use('/article', article);
app.use('/comment', comment);


module.exports = app;