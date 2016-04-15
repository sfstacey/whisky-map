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
  mapTypeControl: false,
  streetViewControl: false,
});
map.mapTypes.set(customMapTypeId, customMapType);
map.setMapTypeId(customMapTypeId);

xmlURL = "xml/distilleries.xml";
loadMarkers(map);
}

function loadMarkers(map){
require(['downloadXML'], function(){
map.markers = map.markers || [];
downloadUrl(xmlURL, function(data){
var xml = xmlParse(data);
var markers = xml.documentElement.getElementsByTagName('marker');

for (var i = 0; i<markers.length; i++){
            var name = markers[i].getAttribute('name');
            var category = markers[i].getAttribute('category');
            var id = markers[i].getAttribute("id");
            switch(category){
              case 'malt':
              var marker_image = "img/icons/malt.png";
              break;
              case 'grain':
              var marker_image = "img/icons/grain.png";
              break;
              case 'pot_still':
              var marker_image = "img/icons/pot_still.png";
              break;
              case 'coffey_still':
              var marker_image = "img/icons/coffey_still.png";
              break;
            }
            var image = {
              url: marker_image,
              size: new google.maps.Size(30, 30),
              origin: new google.maps.Point(0, 0),
              scaledSize: new google.maps.Size(30, 30)
            };
            var point = new google.maps.LatLng(
                parseFloat(markers[i].getAttribute("lat")),
                parseFloat(markers[i].getAttribute("lng")));
            //var html = "<div class='infowindow'><b>" + name + "</b> <br/>" + address+'<br/></div>';
            var marker = new google.maps.Marker({
              map: map,
              position: point,
              icon: image,
              title: name
            });
            map.markers.push(marker);
            //bindInfoWindow(marker, map, infoWindow, html);
        }
    });
  });
};

function downloadUrl(url,callback) {
    var request = window.ActiveXObject ?
         new ActiveXObject('Microsoft.XMLHTTP') :
         new XMLHttpRequest;

    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            //request.onreadystatechange = doNothing;
            callback(request, request.status);
        }
    };

    request.open('GET', url, true);
    request.send(null);
}
