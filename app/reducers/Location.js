import * as types from '../actions/types';
import { get, assign } from 'lodash';

const initialState = {
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
    latitude: 52.22977,
    longitude: 21.0117800
};

export default function MapList(state = initialState, action = {}) {
    switch(action.type) {
        case types.GET_LOCATION.START:
            return {
                ...state,
                loading: true
            };
        case types.GET_LOCATION.SUCCESS:
            return assign({
                ...state,
                loading: false,
            }, action.payload);
        case types.GET_LOCATION.ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}
