import {JWT_STORAGE_KEY} from '../constants';
import {getJWT} from './auth';

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
  headers[JWT_STORAGE_KEY] = getJWT();
  return createConfig(method, body, headers);
}