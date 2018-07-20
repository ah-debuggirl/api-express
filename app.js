var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var routes = require("./routes/routes.js");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(function(req, res, next) {
  res.header("access-control-allow-origin", "http://localhost:4200");
  res.header("access-control-allow-headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("access-control-allow-methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

routes(app);

var server = app.listen(3000 , function(){
    console.log("Running on port", server.address().port);
});

mongoose.connect("mongodb://127.0.0.1:27017/todo-list", {useNewUrlParser: true})
.then(() => {console.log("Successfully connected")})
.catch(() => {console.log("Error connecting to the Mongodb Database")})


