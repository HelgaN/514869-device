function initialize() {
  var myOptions = {
    zoom: 15,
    center: new google.maps.LatLng(55.6870364, 37.5294442)
  }
  var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

  var image = "img/marker.png"

  var myLatlng = new google.maps.LatLng(55.6870364, 37.5294442);

  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    icon: image
  });
}

google.maps.event.addDomListener(window, "load", initialize);
