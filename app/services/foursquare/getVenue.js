import { get } from 'lodash';
import parseResponse from './parseResponse';
import { CLIENT_ID, CLIENT_SECRET } from './config';

export default function getVenue(id) {
    return fetch(`https://api.foursquare.com/v2/venues/${id}` +
            `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}` +
            '&v=20130815')
            .then(parseResponse)
            .then(response => get(response, 'response.venue', {}));
}
