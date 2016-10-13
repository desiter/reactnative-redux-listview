import { delay, get } from 'lodash';
import * as types from './types';

export default function setLocation(location) {
    return (dispatch) => {
        console.log('set location', location);
        dispatch({ type: types.GET_LOCATION.SUCCESS, payload: location });
    };
}
