require(['jquery'], function(){
$(document).ready(function(){

console.log('START:main.js');

require(['api'], function(){
initMap();
activateTimeline();
});
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
  zoom:2,
  center:{lat:51.507351, lng:-0.127758},
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

//create and open infowindow
var infowindow = new google.maps.InfoWindow();

for (var i = 0; i<markers.length; i++){
            var data = markers[i];
            var name = data.getAttribute('name');
            var category = data.getAttribute('category');
            var id = data.getAttribute("id");
            var point = new google.maps.LatLng(
                parseFloat(data.getAttribute("lat")),
                parseFloat(data.getAttribute("lng"))
              );
            var image = {
              url: "img/icons/"+category+".png",
              size: new google.maps.Size(35, 35),
              origin: new google.maps.Point(0, 0),
              scaledSize: new google.maps.Size(35, 35)
            };
            var marker = new google.maps.Marker({
              map: map,
              position: point,
              icon: image,
              title: name
            });
            (function(marker,data){
              google.maps.event.addListener(marker,'click',function(e){
                //wrap the content inside an HTML DIV in order to set height and width of infoWindow
                infowindow.setContent('<div class="infowindow"><div class="infowindow_body"><h2>'+marker.title+'</h2></div></div>');
                infowindow.open(map, marker);
              })
            })(marker, data)
            map.markers.push(marker);
          }
        });
        });
      };

function activateTimeline(){
require(['jqueryui'], function(){
  //get the years of each distillery
  //if the marker matches the current slider position, add the marker
  //if the marker has closed, remove the markers.
$('.timeline_slider').draggable({ axis: "x", containment:'parent'});
});
}
