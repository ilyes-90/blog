const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlEncoded = bodyParser.urlencoded({ extended: false });
const app = express();

require('./models/User');

var main = require('./components/main');
var auth = require('./components/auth');

app.set('view engine', 'pug');

app.use(jsonParser);
app.use(urlEncoded);
app.use('/', main);
app.use('/user', auth);


module.exports = app;