import * as types from './types';

export default function fetchList() {
    return { type: types.FETCH_LIST, items: [
        {
            title: "Pałac Kultury",
            latitude: 52.2318413,
            longitude: 21.0038063
        },
        {
            title: "Warszawa Centralna",
            latitude: 52.2287803,
            longitude: 21.0011293
        },
        {
            title: "Pałac Prezydencki",
            latitude: 52.2287803,
            longitude: 20.9858085
        }
    ] };
}
