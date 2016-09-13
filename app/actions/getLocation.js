import * as types from './types';
import { delay, get } from 'lodash';
import parseResponse from '../helpers/parseResponse';

export default function getLocation() {
    return dispatch => {
        dispatch({ type: types.GET_LOCATION.START });
        navigator.geolocation.getCurrentPosition(
            payload => {
                console.log('current location', payload);
                dispatch({ type: types.GET_LOCATION.SUCCESS, payload });
            },
            error => {
                console.log('location error', error);
                dispatch({ type: types.GET_LOCATION.ERROR, error });
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );

    };
}
