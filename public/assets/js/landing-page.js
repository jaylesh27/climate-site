$(document).ready(function(){

	// Energy Information Administration API key
	var apiKeyEIA = "7882b2fd823072e0b0de8790db627f59";

	function energyInfoAdmin(){
		console.log("Running the Energy Information Administration API for energy usage map generation");

		var queryURL = "http://api.eia.gov/series/?series_id=ELEC.GEN.ALL-AK-99.A&api_key=" + apiKeyEIA + "[&out=json]";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(data){
			console.log(data);
		});
	}

	energyInfoAdmin();

});