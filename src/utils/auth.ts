import { AUTH_HEADER_KEY, JWT_STORAGE_KEY } from '../constant/constants';
import { Storage } from '../services/storage';

export function getJWT() {
  return Storage.get(JWT_STORAGE_KEY);
}

export function saveJWT(jwt) {
  return Storage.set(JWT_STORAGE_KEY, jwt);
}

export function removeJWT() {
  return Storage.remove(JWT_STORAGE_KEY);
}

export function saveAuthData(response) {
  saveJWT(response.headers[AUTH_HEADER_KEY]);
}
