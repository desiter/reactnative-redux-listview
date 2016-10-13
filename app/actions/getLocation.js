import * as types from './types';
import { delay, get } from 'lodash';

export default function getLocation() {
    return dispatch => {
        dispatch({ type: types.GET_LOCATION.START });
        navigator.geolocation.getCurrentPosition(
            data => {
                console.log('current location', data);
                dispatch({ type: types.GET_LOCATION.SUCCESS, payload: data.coords });
            },
            error => {
                console.log('location error', error);
                dispatch({ type: types.GET_LOCATION.ERROR, error });
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );

    };
}
