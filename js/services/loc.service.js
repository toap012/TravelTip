import { storageService } from "./async.storage.service.js"
const PLACES_KEY = 'placesDB'
const Locations_KEY = 'locationDB'


let gLocations = _createLocations()
let gPlaces = _createPlaces()
export const locService = {
    getLocs,
    save,
    get,
    remove,
    query

}
function query() {
    return storageService.query(PET_KEY)
}
function get(locId) {
    return storageService.get(PLACES_KEY, locId)
}
function save(loc) {
    if (loc.id) {
        return storageService.put(PLACES_KEY, loc)
    } else {
        return storageService.post(PLACES_KEY, loc)
    }
}
function remove(locId) {
    return storageService.remove(PLACES_KEY, locId)
}





function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gLocations)
        }, 2000)
    })
}
function _createLocations(){
    let locations = storageService.load(Locations_KEY)
    if(!locations||!locations.length){
        locations = [
_createLocation('Greatplace',  32.047104,  34.832384 ),
_createLocation('Neveragain',  32.047201,  34.832581)
        ]
        storageService.save(Locations_KEY,locations)
    }
    return locations
}

function _createLocation(name,lat,lng){
return{
    name,
    lat,
    lng
}
}

function _createPlaces(){
let Places = storageService.load(PLACES_KEY)
if(!Places||!Places.length){
    Places = gLocations.map(loc=>{
     return   _createPlace(loc.name,loc.lat,loc.lng)
    })
    storageService.save(PLACES_KEY,Places)
}
return Places
}

function _createPlace(name,lat,lng){
return{
    id: storageService.makeId(),
    name,
    lat,
    lng,
    weather: '30°',
    createdAt: new Date(),
    updatedAt: null
}

}
console.log(_createPlace());



/**
 * 4. Build the placeService managing Places:
{id, name, lat, lng, weather, createdAt, updatedAt}
 */