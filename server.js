var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var exphbs = require("express-handlebars");
var request = require('request');

// Requiring our models for syncing
//var db = require("./models");

// National Renewable Energy Laboratory (NREL) API key
var apiKeyNREL = "arjUPgHBbROrBBBY0dLwofwZ6Lahj7HvgPyZff3q";

var userLocation = "08901";

var requestURL = "https://api.data.gov/nrel/alt-fuel-stations/v1/nearest.json?location=" + userLocation +"&radius=20.0&status=E&fuel_type=ELEC&api_key=" + apiKeyNREL;

request(requestURL, function(error, response, body) {
  if (!error) {
    var data = JSON.parse(body);

    var fuelStationsData = data.fuel_stations;
    //console.log(fuelStationsData);
    for (var i = 0; i < fuelStationsData.length; i++) {
    	console.log(fuelStationsData[i].station_name);
    }
  }
});


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

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Setup of handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require('./routes/api-routes.js')(app);

app.listen(port);

// // Syncing our sequelize models and then starting our express app
// db.sequelize.sync({ force: true }).then(function() {
//   app.listen(PORT, function() {
//     console.log("App listening on PORT " + PORT);
//   });
// });