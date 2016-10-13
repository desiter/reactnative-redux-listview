import { get } from 'lodash';
import parseResponse from './parseResponse';
import { CLIENT_ID, CLIENT_SECRET } from './config';

export default function getVenuePhotos(id, limit = 3) {
    return fetch(`https://api.foursquare.com/v2/venues/${id}/photos` +
            `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}` +
            `&v=20130815&intent=browse&limit=${limit}`)
            .then(parseResponse)
            .then(response => get(response, 'response.photos.items', []));
}
