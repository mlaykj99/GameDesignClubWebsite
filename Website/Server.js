/**
 * Created by Josh Greenwell on 10/23/2015.
 */
//App dependencies and setup
var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';

var page_request_count = 0;

/* --- Router functions start --- */
router.use(function (req,res,next) {
    page_request_count++;
    console.log("/" + req.method + ' | Request #: ' + page_request_count);
    next();
});

router.get("/",function(req,res){
    res.sendFile(path + "index.html");
});

router.get("/about",function(req,res){
    res.sendFile(path + "about.html");
});

router.get("/contact",function(req,res){
    res.sendFile(path + "contact.html");
});
/* --- Router functions end --- */

//Add router to the app
app.use("/",router);
//Set up 404 page
app.use("*",function(req,res){
    console.log('404 Sent!');
    res.sendFile(path + "404.html");
});

//Port the server will listen on
app.listen(3000,function(){
    console.log("Live at Port 3000");
});
