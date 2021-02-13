var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/render.html'));
});
app.get('/style.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/style.css'));
});
app.get('/app.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/app.js'));
});


app.listen(25565);