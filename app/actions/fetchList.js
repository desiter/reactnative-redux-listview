import * as types from './types';

export default function fetchList() {
    return { type: types.FETCH_LIST, items: ['row 1', 'row 2'] };
}
