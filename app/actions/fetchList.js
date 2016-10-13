import { delay, get, sortBy } from 'lodash';
import geo from 'geolib';
import * as types from './types';
import searchVenues from '../services/foursquare/searchVenues';

export default function fetchList(region, query) {
    return (dispatch) => {
        dispatch({ type: types.FETCH_LIST.START });
        searchVenues({
            latitude: region.latitude - (region.latitudeDelta / 2),
            longitude: region.longitude - (region.longitudeDelta / 2),
        }, {
            latitude: region.latitude + (region.latitudeDelta / 2),
            longitude: region.longitude + (region.longitudeDelta / 2),
        }, query)
            .then(items => items.map(((item) => {
                item.distance = Math.round(geo.getDistance(region, {
                    latitude: get(item, 'location.lat'),
                    longitude: get(item, 'location.lng'),
                }));
                return item;
            })))
            .then(items => sortBy(items, 'distance'))
            .then(payload => dispatch({ type: types.FETCH_LIST.SUCCESS, payload }))
            .catch(err => dispatch({ type: types.FETCH_LIST.ERROR, payload: err }));
    };
}
