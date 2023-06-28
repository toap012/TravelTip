import { storageService } from "./async.storage.service.js"
import { locService } from "./loc.service.js"

export const mapService = {
    initMap,
    addMarker,
    panTo,
    panToSearchedLoc,
}


var gMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            gMap.addListener("click", (mapsMouseEvent) => {
                console.log(mapsMouseEvent.latLng.lat())
                console.log(mapsMouseEvent.latLng.lng())
                const coords = {
                    lat: mapsMouseEvent.latLng.lat(),
                    lng: mapsMouseEvent.latLng.lng()
                }
                const placeName = prompt('Place name?')
                locService.addPlace(placeName, coords)
                console.log(coords);
            })

            console.log('Map!', gMap)
            return gMap
        })
}

function panToSearchedLoc(value) {
    var request = {
        query: value,
        fields: ['name', 'geometry'],
    };

    var service = new google.maps.places.PlacesService(gMap);

    service.findPlaceFromQuery(request, function (results, status) {
        console.log(results);
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                // console.log(results[i].geometry.location.lat);
                addMarker(results[0].geometry.location);

            }
            gMap.setCenter(results[0].geometry.location);
        }
    });
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    })
    return marker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyBc5lxBmbPCfcMOg1jzm8bTyoz0Y7AqeYY'
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}