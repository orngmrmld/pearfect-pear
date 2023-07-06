const options = {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Authorization': 'GOOGLE_KEY'
  }
}

var geocoder;
var maps;
var services;

let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  geocoder = new google.maps.Geocoder();
  map = new Map(document.getElementById("map"), {
    center: { lat: 35.640556, lng: -120.680008 },
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var input = document.getElementById('searchTextField');

let autocomplete = new google.maps.places.Autocomplete(input);
autocomplete.bindTo('bounds', map);

let marker = new google.maps.Marker({
  map: map
})

google.maps.event.addListener(autocomplete, 'place_changed', () => {
  var place = autocomplete.getPlace();
  console.log(place);
  console.log(place.photos[0].getUrl());

  if (place.geometry.viewport) {
    map.fitBounds(place.geometry.viewport);
  } else {
    map.setCenter(place.geometry.location);
    map.setZoom(17);
  }
  marker.setPosition(place.geometry.location)
  marker.setVisible(true)

  let request = {
    location: place.geometry.location,
    radius: '5000',
    keyword: 'dine_in',
    type: "restaurant"

  }

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
})

}

function callback(results, status){
    
  if (status== google.maps.places.PlacesServiceStatus.OK){
    for(var i =0;i<results.length;i++){
      var place = results[i];
      createMarker(results[i]);
    }
  }

}

function createMarker(place) {
var marker = new google.maps.Marker({
  map: map,
  position: place.geometry.location
});

google.maps.event.addListener(marker, 'click', function () {
    alert(place.name);
   // window.open(place.photos[0].getUrl(),"_blank");
    infowindow.open(map, this);
});

}

//geocoder to turn zipcode into lat and long so it iniates from there
function codeAddress(storedZipCode) {
  geocoder.geocode( { 'address': storedZipCode}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      //Got result, center the map and put it out there
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

initMap();

// function initialize() {
//   var paso = new google.maps.LatLng(35.640556, -120.680008);

//   map = new google.maps.Map(document.getElementById('map'), {
//     center: paso,
//     zoom: 15
//   });

//   var input = document.getElementById('searchTextField');

//   let autocomplete = new google.maps.places.Autocomplete(input);
//   autocomplete.bindTo('bounds', map);

//   let marker = new google.maps.Marker({
//     map: map
//   })

//   google.maps.event.addListener(autocomplete, 'place_changed', () => {
//     var place = autocomplete.getPlace();
//     map.setZoom(17);
//     console.log(place);
//     console.log(place.photos[0].getUrl());

//     if (place.geometry.viewport) {
//       map.fitBounds(place.geometry.viewport);
//     } else {
//       map.setCenter(place.geometry.location);
//       map.setZoom(17);
//     }
//     marker.setPosition(place.geometry.location);
//     marker.setVisible(true);

//     let request = {
//       location: place.geometry.location,
//       radius: '5000',
//       keyword: 'dine_in',
//       type: "restaurant"
//     }

//     service = new google.maps.places.PlacesService(map);
//     service.nearbySearch(request, callback);
//   });
// }

// function callback(results, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       var place = results[i];
//       createMarker(results[i]);
//     }
//   }
// }

// function createMarker(place) {
//   var marker = new google.maps.Marker({
//     map: map,
//     position: place.geometry.location
//   });


//   google.maps.event.addListener(marker, 'click', function () {
//     window.open(place.photos[0].getUrl(), "_blank");
//   });
// }