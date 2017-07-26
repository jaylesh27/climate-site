$(document).ready(function(){

	//Carousel pause / start
	// $(function () {
 //    	$('#myCarousel').carousel({
 //        	interval:3000,
 //        	pause: "hover"
 //    	});
/*
    $('#pauseButton').click(function () {
        $('#myCarousel').carousel('pause');
        
    	});
    $('#playButton').click(function () {
        $('#myCarousel').carousel('cycle');
    	});
    
	});
*/

	// Energy Information Administration API key
	// move this Ajax request to the back-end and use the request package
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

	$("#login-submit").on("click", function(event){
		event.preventDefault();

		var newUser = {
			username: $("#username").val().trim(),
			password: $("#password").val().trim()
		};

		console.log(newUser);

		// $.post("/newUser", newUser);

	});

});