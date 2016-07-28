'use strict';
import {JWT_STORAGE_KEY} from '../../setting';

export function createConfig(method, body, headers){
  return {
    method: method,
    headers: {
      'content-type':'application/json',
      ...headers
    },
    body: JSON.stringify(body)
  };
}


export function createConfigWithAuth(method, body, headers = {}) {
  headers[JWT_STORAGE_KEY] = localStorage.getItem('jwts-token');
  return createConfig(method, body, headers);
}
