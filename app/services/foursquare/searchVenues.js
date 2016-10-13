import { get } from 'lodash';
import parseResponse from './parseResponse';
import { CLIENT_ID, CLIENT_SECRET } from './config';

const CATEGORY_ID = '4bf58dd8d48988d1e0931735';

export default function searchVenues(sw, ne, phrase) {
    const search = phrase ? `&query=${phrase}` : '';

    return fetch('https://api.foursquare.com/v2/venues/search' +
        `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}` +
        '&v=20130815&intent=browse&limit=50' +
        `&sw=${sw.latitude},${sw.longitude}` +
        `&ne=${ne.latitude},${ne.longitude}` +
        `&categoryId=${CATEGORY_ID}${search}`)
        .then(parseResponse)
        .then(response => get(response, 'response.venues', []));
}
