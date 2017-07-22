// var db = require("../models");

module.exports = function(app) {
	app.get("/", function(req, res){
		res.render("index");
	});

	// this will render the survey for the new user to take when they sign up for the site
	// app.get("/survey/:id", function(req, res){
	// 	res.render("/survey/:id")
	// });

	// this will render the user specific profile that will reflect their carbon impact based upon their survey answers
	// app.get("/user/:id", function(req, res){
	// 	res.render("/user/:id");
	// });
};