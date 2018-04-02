//
// Nusu Alabuğa - 2017
// Google Map
//
// github.com/nusu
//
//

//
// SAMPLE USAGE
//
// 1- Save your marker pin to assets/img/ as pin.png
//
// 2- Put your coordinates into #map seperate with comma
//
// <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyAUnkZHujWyvnOPCWbvCpdk4_2A7ObmymE&sensor=false"></script>
// <div class="map" id="map">
//     39.854534, 32.646819,16
// </div>
//

$(function () {
    loadMap();
});

function loadMap() {
  var mapId = "map";

  if(document.getElementById(mapId) == null) {
    return;
  }
  
  var mapsElement = document.getElementById(mapId);
  var coords = mapsElement.innerHTML.split(",");
  if (coords.length != 3) {
    mapsElement.display = "none";
    return;
  }

  var latlng = new google.maps.LatLng(parseFloat(coords[0]),parseFloat(coords[1]));
  var myOptions = {
    zoom: parseFloat(coords[2]),
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    mapTypeControl: false,
    zoomControl: true,
    key: "AIzaSyAUnkZHujWyvnOPCWbvCpdk4_2A7ObmymE",
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL
    }
  };
  
  var map = new google.maps.Map(document.getElementById(mapId), myOptions);
  var icon = { 
        url: 'assets/img/pin.png'
    };

  var marker = new google.maps.Marker({
    position: latlng,
    map: map,
    icon: icon
  });   
}