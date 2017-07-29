var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var exphbs = require("express-handlebars");
var request = require('request');

// package used for validating username and password inputs
var expressValidator = require('express-validator');


// Authentification packages
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

// package for storing local session in database
var SequelizeStore = require('connect-session-sequelize')(session.Store);

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


app.use(session({
	// secret is used to encrypt the session. Note: best practice is to not store the key here because it will be uploaded to the github repo
  secret: 'fdjkdidaoishe',
  resave: false,
  saveUninitialized: false,
  // use if you have https...
  // cookie: { secure: true }
}));

// initiliaze passport and integrates passport with express session
app.use(passport.initialize());
app.use(passport.session());

// Setup of handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require('./routes/api-routes.js')(app);

passport.use(new LocalStrategy(
  function(username, password, done) {
  		// console.log(username);
  		// console.log(password);
  		db.User.findAll({
  			where: {
  				username: username
  			}
  		}).then(function(results){
  			// if (err) {done(err)};

  			if (results.length === 0) {
  				done(null, false);
  			} else {
	  			// console.log(results[0].id);
	  			// console.log(results[0].password.toString());
	  			var hash = results[0].password.toString();
	  			var userID = results[0].id;

	  			bcrypt.compare(password, hash, function(err, response){
	  				if (response === true) {
	  					console.log("login successful");
	  					return done(null, {id: userID});
	  				} else {
	  					// this means the authentication request failed
	  					return done(null, false);
	  				}
	  			});
  			}

  		});

	}
));

// removed "({ force: true })" so the existing table isn't dropped whenever the db is synced
db.sequelize.sync({}).then(function() {
  app.listen(port, function() {
    console.log("App listening on PORT " + port);
  });
});