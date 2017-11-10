// @flow

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const localPort = 8080;

app.set('port', (process.env.PORT || localPort));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.listen(app.get('port'), function() {
  console.log('API is listening on', app.get('port'));
});

module.exports = app;
