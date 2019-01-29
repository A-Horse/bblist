//
import { JWT_STORAGE_KEY, CACHED_USERNAME, CACHED_USERID, CACHED_USEREMAIL } from '../constants';
import { Storage } from '../services/storage';

export function getJWT() {
  return Storage.get(JWT_STORAGE_KEY);
}

export function saveJWT(jwt) {
  return Storage.set(JWT_STORAGE_KEY, jwt);
}

export function getCachedUserId() {
  return Storage.get(CACHED_USERID);
}

function saveUserData(userData) {
  return Storage.set('USER_DATA', userData);
}

export function getUserData() {
  const userData = Storage.get('USER_DATA');
  return userData ? JSON.parse(userData) : null;
}


export function saveAuthData(response) {
  Storage.set(CACHED_USERID, response.user.id);
  Storage.set(CACHED_USERNAME, response.user.username);
  Storage.set(CACHED_USEREMAIL, response.user.email);

  saveUserData(JSON.stringify(response.user));

  saveJWT(response.token);
}
