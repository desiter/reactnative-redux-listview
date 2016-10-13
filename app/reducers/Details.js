import * as types from '../actions/types';

const initialState = {
    data: {},
};

export default function Details(state = initialState, action = {}) {
    switch (action.type) {
        case types.FETCH_DETAILS.START:
            return {
                ...state,
                loading: true,
            };
        case types.FETCH_DETAILS.SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case types.FETCH_DETAILS.ERROR:
            return {
                ...state,
                data: null,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
