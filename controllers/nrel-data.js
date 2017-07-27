var request = require('request');

var chargingStations = {
	// National Renewable Energy Laboratory (NREL) API key
	apiKeyNREL: "lwn55ptcLEQrb0fnr9qEQcuPWCTTP9BZ8w252zXk",

	// fixed value for now, will need to import userLocation (a zipcode) from survey model
	userLocation: "08901",

	requestURL: "https://api.data.gov/nrel/alt-fuel-stations/v1/nearest.json?location=" + this.userLocation +"&radius=20.0&status=E&fuel_type=ELEC&api_key=" + this.apiKeyNREL,

	apiCall: function() {
			request(this.requestURL, function(error, response, body) {
			  if (!error) {
			  	console.log("api call works");
			    var data = JSON.parse(body);
			    console.log(data);
			    // var fuelStationsData = data.fuel_stations;
			    //console.log(fuelStationsData);
			    // for (var i = 0; i < fuelStationsData.length; i++) {
			    // 	console.log(fuelStationsData[i].station_name);
			    // }
			  }
			});
	}

};

module.exports = chargingStations;