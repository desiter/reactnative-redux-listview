import * as types from './types';
import { delay, get } from 'lodash';

export default function setLocation(location) {
    return dispatch => {
        console.log('set location', location);
        dispatch({ type: types.GET_LOCATION.SUCCESS, payload: location });
    };
}
