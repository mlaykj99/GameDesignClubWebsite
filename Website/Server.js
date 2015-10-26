/**
 * Created by Josh Greenwell on 10/23/2015.
 */
//App dependencies and setup
var express = require("express");
var app = express();

//Port the server will listen on
app.listen(3000,function(){
    console.log("Live at Port 3000");
});
