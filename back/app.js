var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var path = require('path');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.resolve(__dirname, '..', 'front', 'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET");
    next();
});

require('./app/controllers')(app);

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'front', 'build', 'index.html'));
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});