var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var exphbs = require("express-handlebars");
var request = require('request');
// package used for validating username and password inputs
var expressValidator = require('express-validator');
// package for hashing user passwords
var bcrypt = require('bcrypt');
// what this line means is the amount of rounds the password goes when it gets hashed
var saltRounds = 10;

// Requiring our models for syncing
var db = require("./models");


var port = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));


app.use(bodyParser.urlencoded({ extended: false }));
// this following line must be immediately after any of the bodyParser middlewares! (it is part of the express-validator package)
app.use(expressValidator());

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Setup of handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require('./routes/api-routes.js')(app);

// app.listen(port);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(port, function() {
    console.log("App listening on PORT " + port);
  });
});