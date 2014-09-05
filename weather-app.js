$(function() {
	$('form.weatherInput').on('submit', function(e){
			e.preventDefault();
			var city = $('input[name="city"]').val(); //city can be named anything, its a new variable.
			goGetTheWeather(city);
	});
}); // end doc ready

var goGetTheWeather = function(city){
// var weatherWidget = function(){
	var encodedCity = encodeURI(city);
	$.ajax('http://api.wunderground.com/api/53a7b596c0520e29/conditions/q/'+ encodedCity +'.json', {
	    type: 'GET',
	    dataType: 'jsonp',
	    success: function(data){
	    	var w = data.current_observation;

	    	// check if there is EVEN any weather
	    	if(!w) {
	    		alert("Please Be More Specific.");
	    		return; // abandon all ship
	    	}
	    	
	    	var weather = w.weather;
	    	var city  = w.display_location.city;
	    	var temp = w.temp_c;
	    	var date = w.local_time_rfc822;


	    	
	    	$('.weather_string').text(weather);
	    	$('.city_name').text(city);
	    	$('.temp_c').text(temp);
			$('.date_time').text(date);

			//var overcast = ['Overcast', ''] 

			if(weather === "Overcast" || weather === "Cloudy" || weather === "Mostly Cloudy" || weather === "Partly Cloudy" || weather === "Scattered Clouds") {
				$('.thing').removeClass('snow rain death sunny');
				$('.thing').addClass('cloud');
			}
			else if(weather === "Sunny" || weather === "Clear" || weather === "Mostly Sunny" || weather === "Partly Sunny" || weather === "Haze"){
				$('.thing').removeClass('snow rain death sunny');
				$('.thing').addClass("sunny");
			}
			else if(weather === "Rain" || weather === "Chance of Rain" || weather === "Chance of Freezing Rain" || weather === "Chance of Thunderstorms" || weather === "Thunderstorms" || weather === "Light Rain"){
				$('.thing').removeClass('snow rain death sunny');
				$('.thing').addClass("rain");
			}
			else if (weather === "Light Snow" || weather === "Snow" || weather === "Chance of Flurries" || weather === "Chance of Sleet" || weather === "Chance of Snow" || weather === "Flurries" || weather === "Freezing Rain" || weather === "Sleet"){
				$('.thing').removeClass('snow rain death sunny');
				$('.thing').addClass("snow");
			}
			else {
				$('.thing').removeClass('cloud').addClass("death");
			}


		$( ".weather_widget" ).show();

			
			// func for random number
			function randNum(from,to) {
			    return Math.floor(Math.random()*(to-from+1)+from);
			}

		    $('.thing').each(function() {
		        $(this).css({
		            'font-size':randNum(5,55) + 'px',
		            'left':randNum(0,80) + '%',
		            '-webkit-animation': 'thing '+ randNum(20,60) + 's linear '+ randNum(0,5) +'s infinite',
		            '-webkit-filter' : 'blur('+( Math.random() ) +'px)'
		        }); 
		    });

		} // end success

		


	});

}; //weather widget function
	

// goGetTheWeather('toronto ontario');


// $(document).ready(function(){
//   weatherWidget.init();

// });

// || weather=""




