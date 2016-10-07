import parseResponse from './parseResponse';
import { CLIENT_ID, CLIENT_SECRET } from './config';
import { get } from 'lodash';

export default function searchVenues(sw, ne, phrase) {
    const search = phrase ? `&query=${phrase}` : '';

    return fetch('https://api.foursquare.com/v2/venues/search' +
        `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}` +
        `&v=20130815&intent=browse&limit=50` +
        `&sw=${sw.latitude},${sw.longitude}` +
        `&ne=${ne.latitude},${ne.longitude}` +
        `&categoryId=4bf58dd8d48988d1e0931735${search}`)
        .then(parseResponse)
        .then(response => get(response, 'response.venues', []))
}
