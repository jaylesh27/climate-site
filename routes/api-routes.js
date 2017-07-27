var db = require("../models");
var chargingStations = require("../controllers/nrel-data.js");

chargingStations.apiCall();

module.exports = function(app) {
	app.get("/", function(req, res){
		res.render("index");
	});

	// this will render the survey for the new user to take when they sign up for the site
	app.get("/survey/:id", function(req, res){
		res.render("/survey/:id")
	});

	// this will render the user specific profile that will reflect their carbon impact based upon their survey answers


	app.get("/user", function(req, res){
		res.render("user");
	});

	app.get("/survey", function(req, res){
		res.render("survey");

	});

	
	//this will calculate the carbon footprint based on the user's scores, then add them to the database (hopefully)

	app.post("/", function(req, res){

		//UTILITIES

		var electricEmission=(req.body.electric/0.12)*1.37*12;
		console.log(electricEmission);
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

		db.Survey.create({
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
	    })
	    .then(function(data) {
	      res.end();
	    });	
	
	});

	app.post("/user/new", function(req, res){

		console.log("New User:");
		console.log(req.body);

		db.User.create({
			username: req.body.username,
			password: req.body.password
		}).then(function(results){
			res.end();
		});
	});

};