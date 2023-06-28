import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onSearchLoc = onSearchLoc

function onInit() {
    mapService.initMap()
        .then((res) => {
            console.log('Map is ready', res)
        })
        .catch(() => console.log('Error: cannot init map'))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}
function onSearchLoc(ev) {
    const data = new FormData(ev.target)
    const value = [...data.entries()][0][1]
    console.log(value);
    ev.preventDefault()
    console.log('searching...');
    mapService.panToSearchedLoc(value)
}
function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            const locsDisplay = locs.map(loc => {
                return `<li class="loc-list-item">
                            <button onclick="onDelete()">❌</button>
                            <button onclick="onPanTo()">GO</button>
                            Name: ${loc.name} Created At: ${loc.createdAt}
                         </li>`
            })
            console.log('Locations:', locs)
            // document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
            document.querySelector('.locs').innerHTML = locsDisplay.join('')
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}
function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}