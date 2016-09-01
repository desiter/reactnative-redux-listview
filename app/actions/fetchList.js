import * as types from './types';
import { delay, get } from 'lodash';
import parseResponse from '../helpers/parseResponse';

const CLIENT_ID = '5BFD4R5BH10S0HVQEF4SONIRIDTSAL35TIODO5BJ5FH5AWXO';
const CLIENT_SECRET = '1EEDWNTH2CHHATIDE0TD4DKDKXUWHXK05UG4JURUDGCCATSK';

export default function fetchList(region) {
    return dispatch => {
        dispatch({ type: types.FETCH_LIST.START });
        const swLatitude = region.latitude - (region.latitudeDelta / 2);
        const swLongitude = region.longitude - (region.longitudeDelta / 2);
        const neLatitude = region.latitude + (region.latitudeDelta / 2);
        const neLongitude = region.longitude + (region.longitudeDelta / 2);
        fetch('https://api.foursquare.com/v2/venues/search' +
            `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}` +
            `&v=20130815&intent=browse&limit=50` +
            `&sw=${swLatitude},${swLongitude}` +
            `&ne=${neLatitude},${neLongitude}` +
            `&query=coffee`)
            .then(parseResponse)
            .then(response => {
                const payload = get(response, 'response.venues', [])
                    .map(venue => ({
                        title: get(venue, 'name', 'Unknown'),
                        latitude: get(venue, 'location.lat', region.latitude),
                        longitude: get(venue, 'location.lng', region.longitude)
                    }));
                dispatch({ type: types.FETCH_LIST.SUCCESS, payload });
            })
            .catch(err => dispatch({ type: types.FETCH_LIST.ERROR, payload: err }))

    };
}
