import * as types from '../actions/types';

const initialState = {
    items: []
};

export default function SimpleList(state = initialState, action = {}) {
    console.log('action', action.type, action.items);
    switch(action.type) {
        case types.FETCH_LIST:
            return {
                ...state,
                items: action.items
            };
        default:
            return state;
    }
}
