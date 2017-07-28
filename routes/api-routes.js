var db = require("../models");

// package used for validating username and password inputs
var expressValidator = require('express-validator');
// package for hashing user passwords
var bcrypt = require('bcrypt');
// what this following line means is the amount of rounds the password goes when it gets hashed (10 hashes per second...)
var saltRounds = 10;


var chargingStations = require("../controllers/nrel-data.js");

chargingStations.apiCall();

module.exports = function(app) {
	app.get("/", function(req, res){
		res.render("index");
	});

	// renders new user registration page when "Register" is clicked on index.handlebars page
	app.get("/new-user", function(req, res){
		res.render("registration");
	});

	// route that will post new user data to the database
	app.post('/register', function(req, res) {

		// this is the express-validator middleware that will check the username and password inputs; placed here so we can check the inputs before they are stored in the below variables
		req.checkBody('username', 'Username field cannot be empty.').notEmpty();
		req.checkBody('username', 'Username must be between 4 and 80 characters').len(4, 80);
		req.checkBody('password', "Password must be between 8 and 20 characters").len(8, 20);
		req.checkBody('passwordMatch', "Password must be between 8 and 20 characters").len(8, 20);
		req.checkBody('passwordMatch', "Passwords don't match, try again.").equals(req.body.password);

		var errors = req.validationErrors();
		if (errors) {
			console.log('errors: ' + JSON.stringify(errors));

			// render of the landing page if there is an error, need to create an error page!!
			res.render("errors", {
				errors: errors
			});
		} else {
			console.log(req.body);
			// store the username and password in variables
			var userName = req.body.username;
			var passWord = req.body.password;
			var passWordMatch = req.body.passwordMatch;


			bcrypt.hash(passWord, saltRounds, function(err, hash) {

				db.User.create({
					username: userName,
					password: hash
				}).then(function(err, results){
					// need to create a model or some kind of notification that shows that the account was created successfully
					res.redirect("/");
				});
				
				// Store hash in your password DB.
			});
		}

	});

	app.get("/user", function(req, res){
		res.render("user");
	});

	app.get("/survey", function(req, res){

		res.render("survey");

	});
		
	//this will calculate the carbon footprint based on the user's scores, then add them to the database (hopefully)

	app.post("/survey", function(req, res){
		console.log(req.body.password[1], req.body.passwordMatch);

		//LOGIN INFO 
		// this is the express-validator middleware that will check the username and password inputs; placed here so we can check the inputs before they are stored in the below variables
		req.checkBody('username', 'Username field cannot be empty.').notEmpty();
		req.checkBody('username', 'Username must be between 4 and 80 characters').len(4, 80);
		req.checkBody('password', "Password must be between 8 and 20 characters").len(8, 20);
		req.checkBody('passwordMatch', "Password must be between 8 and 20 characters").len(8, 20);
		req.checkBody('passwordMatch', "Passwords don't match, try again.").equals(req.body.password[1]);

		var errors = req.validationErrors();
		if (errors) {
			console.log('errors: ' + JSON.stringify(errors));

			// render of the landing page if there is an error, need to create an error page!!
			res.render("errors", {
				errors: errors
			});
		} else {
			console.log(req.body);
			// store the username and password in variables
			var userName = req.body.username[1];
			var passWord = req.body.password[1];
			var passWordMatch = req.body.passwordMatch;


			bcrypt.hash(passWord, saltRounds, function(err, hash) {

				db.User.create({
					username: userName,
					password: hash
				}).then(function(err, results){
					// need to create a model or some kind of notification that shows that the account was created successfully
					res.redirect("/");
				});
				
				// Store hash in your password DB.
			});
		}

		//UTILITIES

		var electricEmission=(req.body.electric/0.12)*1.37*12;		
		var natgasEmission=(req.body.natgas/11.38)*120.61*12;
		var fuelOilEmission=(req.body.fuelOil/2.586)*22.37*12;
		var propaneEmission=(req.body.propane/2.39)*12.17*12;

		//TRANSPORTATION

		var car1Emission=(req.body.car1mileage*52)/(req.body.car1mpg);
		var car2Emission=(req.body.car2mileage*52)/(req.body.car2mpg);
		var car3Emission=(req.body.car3mileage*52)/(req.body.car3mpg);
		var publicTransportationEmission=(req.body.publicMileage*19.2)+(19.4*(100/95)*0.0022);
		var airEmission=(req.body.airmileage)*(223*1.2*1.9*0.0022);

		//DIET
		
		var meatEmission=(req.body.meat*1452*12*0.0022);
		var breadEmission=(req.body.bread*741*12*0.0022);
		var dairyEmission=(req.body.dairy*1911*12*0.0022);
		var fruitEmission=(req.body.fruit*1176*12*0.0022);
		var otherEmission=(req.body.other*467*12*0.0022);

		//OTHER

		var clothingEmission=(req.body.clothing*436*12*0.0022);
		var furnitureEmission=(req.body.furniture*459*12*0.0022);
		var goodsEmission=(req.body.clothing*338*12*0.0022);
		var servicesEmission=(req.body.clothing*178*12*0.0022);

		var carbonFootprint=Math.round(electricEmission+natgasEmission+fuelOilEmission+propaneEmission+car1Emission+car2Emission+car3Emission+
		publicTransportationEmission+airEmission+meatEmission+breadEmission+dairyEmission+fruitEmission+otherEmission+clothingEmission+
		furnitureEmission+goodsEmission+servicesEmission);

		console.log("Your carbon footprint is: " +carbonFootprint);

		db.Survey.create({
		  username: userName,
		  password: passWord,
	      electricEmission: electricEmission,
	      naturalGasEmission: natgasEmission,
	      fuelOilEmission: fuelOilEmission,
	      propaneEmission: propaneEmission,
	      car1Emission: car1Emission,
	      car2Emission: car2Emission,
	      car3Emission: car3Emission,
	      publicTransportationEmission: publicTransportationEmission,
	      airEmission: airEmission,
	      meatEmission: meatEmission,
	      breadEmission: breadEmission,
	      dairyEmission: dairyEmission,
	      fruitEmission: fruitEmission,
	      otherEmission: otherEmission,
	      clothingEmission: clothingEmission,
	      furnitureEmission: furnitureEmission,
	      goodsEmission: goodsEmission,
	      servicesEmission: servicesEmission,
	      carbonFootprint: carbonFootprint
	    })
	    .then(function(data) {	  
	    	console.log(data.dataValues);  	
	      res.render("results", data.dataValues);
	    });	
	
	});

	// this will get the user by their ID and return the individualized user.handlebars page...
	// app.get("/user/:id", function(req, res){

	// 	console.log(req.body);

	// });

};