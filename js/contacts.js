(function() {
	"use strict";

})();

function initMap() {
	var map = new google.maps.Map(document.getElementById("map"), {
	    center: {
	    	lat: 50.006039,
	    	lng: 36.243285
	    },
	    zoom: 17
	});

	new google.maps.Marker({
		position: {
	    	lat: 50.006000,
	    	lng: 36.243420
		},
		map: map,
		icon: "img/computing64.png"
	});
}