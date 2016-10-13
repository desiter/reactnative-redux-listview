import * as types from '../actions/types';
import { get } from 'lodash';

const initialState = {
    items: [],
    location: null
};

export default function MapList(state = initialState, action = {}) {
    switch(action.type) {
        case types.FETCH_LIST.START:
            return {
                ...state,
                loading: true
            };
        case types.FETCH_LIST.SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload
            };
        case types.FETCH_LIST.ERROR:
            return {
                ...state,
                list: [],
                loading: false,
                error: action.payload
            };
        case types.GET_LOCATION.START:
            return {
                ...state,
                loading: true
            };
        case types.GET_LOCATION.SUCCESS:
            return {
                ...state,
                loading: false,
                location: get(action, 'payload.coords')
            };
        case types.GET_LOCATION.ERROR:
            return {
                ...state,
                loading: false,
                location: null,
                error: action.payload
            };
        default:
            return state;
    }
}
