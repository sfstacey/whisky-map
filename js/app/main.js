$(document).ready(function(){

console.log('START:main.js');

require(['mapAPI'], function(){
initMap();
});
});

function initMap(){
var mapContainer = document.getElementBy('whisky-map');
var map = new google.maps.Map(mapContainer, {center:{lat:44.540, lng:-78.546},
zoom:8});

}
