$(document).ready(function(){

console.log('START:main.js');

require(['api'], function(){
initMap();
});
});

function initMap(){

var customMapType = new google.maps.StyledMapType([
  {stylers: [
          {hue: '#d5530f'},
          {visibility: 'simplified'},
          {gamma: 0.5},
          {weight: 0.5}
        ]
      },
      {elementType: 'labels',
            stylers: [{visibility: 'on'}]
          },
          {
              featureType: 'water',
              stylers: [{color: '#eeb577'}]
            },
          ]);
var customMapTypeId = 'whisky-style';
var map = new google.maps.Map(document.getElementById('whisky-map'), {
  zoom:8,
  center:{lat:44.540, lng:-78.546},
});

map.mapTypes.set(customMapTypeId, customMapType);
map.setMapTypeId(customMapTypeId);
}
