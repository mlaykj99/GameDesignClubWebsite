/**
 * Created by Josh Greenwell on 10/23/2015.
 */
//App dependencies and setup
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    console.log("Get received! " + req.status);
    res.header('Access-Control-Allow-Origin: *');
    res.send("Gotcha.");
});

app.post('/games', function(req, res) {
    res.header('Access-Control-Allow-Origin: *');
    res.send(req.body);
});

//Port the server will listen on
app.listen(3000, function() {
    console.log("Server Started...");
});