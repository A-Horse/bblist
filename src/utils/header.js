import { JWT_STORAGE_KEY } from '../constant/constants';
import { getJWT } from './auth';

export function createConfig(method, body, headers) {
  return {
    method: method,
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  };
}

export function createFormDataConfig(method, body, headers) {
  return {
    method: method,
    headers: {
      ...headers,
    },
    body: body,
  };
}

export function createConfigWithAuth(method, body, headers = {}) {
  const jwt = getJWT();
  if (jwt) {
    headers[JWT_STORAGE_KEY] = jwt;
  }
  return createConfig(method, body, headers);
}

export function createFormDataConfigWithAuth(method, body, headers = {}) {
  headers[JWT_STORAGE_KEY] = getJWT();
  return createFormDataConfig(method, body, headers);
}
