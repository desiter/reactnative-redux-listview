import { delay, get, sortBy } from 'lodash';
import geo from 'geolib';
import * as types from './types';
import getVenue from '../services/foursquare/getVenue';

export default function fetchDetails(id, region) {
    return (dispatch) => {
        dispatch({ type: types.FETCH_DETAILS.START });
        getVenue(id)
            .then((item) => {
                item.distance = Math.round(geo.getDistance(region, {
                    latitude: get(item, 'location.lat'),
                    longitude: get(item, 'location.lng'),
                }));
                return item;
            })
            .then(payload => dispatch({ type: types.FETCH_DETAILS.SUCCESS, payload }))
            .catch(err => dispatch({ type: types.FETCH_DETAILS.ERROR, payload: err }));
    };
}
