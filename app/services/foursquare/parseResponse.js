import { get } from 'lodash';

export default function parseResponse(response) {
    return Promise.all([response, response.json()])
        .then(([response, json]) => {
            if (response.status < 200 || response.status >= 300) {
                const error = new Error(get(json, 'meta.errorDetail', response.statusText));
                error.code = response.status;
                error.body = json;
                throw error;
            }
            return json;
        });
}
