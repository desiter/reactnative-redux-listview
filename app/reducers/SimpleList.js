import * as types from '../actions/types';

const initialState = {
    items: []
};

export default function SimpleList(state = initialState, action = {}) {
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
                items: action.items
            };
        default:
            return state;
    }
}
