import fetch from 'isomorphic-fetch';
import R from 'ramda';
import { handleResponse } from 'utils/http-handle';
import { createConfigWithAuth } from '../utils/header';

function generateUri(url, query) {
  return !query
    ? url
    : url + '?' + R.compose(R.join('&'), R.map(k => `${k}=${query[k]}`), R.keys)(query);
}

export const http = {
  get(url, query) {
    return fetch(generateUri(url, query), createConfigWithAuth('GET')).then(handleResponse);
  },
  post(url, query, body) {
    return fetch(generateUri(url, query), createConfigWithAuth('POST', body)).then(handleResponse);
  },
  patch(url, query, body) {
    return fetch(generateUri(url, query), createConfigWithAuth('PATCH', body)).then(handleResponse);
  }
};

export default http;
