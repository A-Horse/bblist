import fetch from 'isomorphic-fetch';
import { handleResponse, handleResponseWithoutJson } from 'utils/http-handle';
import { createConfigWithAuth } from '../utils/header';

export const http = {
  get(url, query) {
    return fetch(url, createConfigWithAuth('GET'));
  },
  post(url, query, body) {
    return fetch(url, createConfigWithAuth('POST', body)).then(handleResponse);
  }
};
