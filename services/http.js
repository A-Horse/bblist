import fetch from 'isomorphic-fetch';
import R from 'ramda';
import { handleResponse } from 'utils/http-handle';
import { createConfigWithAuth, createFormDataConfigWithAuth } from '../utils/header';

function generateUri(url, query) {
  return !query
    ? url
    : url + '?' + R.compose(R.join('&'), R.map(k => `${k}=${query[k]}`), R.keys)(query);
}

function f(method) {
  return (url, query, body = null, options = {}) => {
    let createConfigFn;
    if (options.formData) {
      createConfigFn = createFormDataConfigWithAuth;
    } else {
      createConfigFn = createConfigWithAuth;
    }
    return fetch(generateUri(url, query), createConfigFn(method, body)).then(
      R.partialRight(handleResponse, [options.withHeader])
    );
  };
}

export const http = {
  get: f('GET'),
  post: f('POST'),
  patch: f('PATCH'),
  delete: f('DELETE')
};

export default http;
