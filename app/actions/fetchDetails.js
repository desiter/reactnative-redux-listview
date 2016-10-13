import * as types from './types';
import { delay, get, sortBy } from 'lodash';
import getVenue from '../services/foursquare/getVenue';
import geo from 'geolib';

export default function fetchDetails(id, region) {
    return dispatch => {
        dispatch({ type: types.FETCH_DETAILS.START });
        getVenue(id)
            .then(item => {
                item.distance = Math.round(geo.getDistance(region, {
                    latitude: get(item, 'location.lat'),
                    longitude: get(item, 'location.lng')
                }));
                return item;
            })
            .then(payload => dispatch({ type: types.FETCH_DETAILS.SUCCESS, payload }))
            .catch(err => dispatch({ type: types.FETCH_DETAILS.ERROR, payload: err }));
    };
}
