import {
  AUTH_DATA,
  JWT_STORAGE_KEY,
  CACHED_USERNAME,
  CACHED_USERID,
  CACHED_USEREMAIL
} from '../constants';
import { Storage } from '../services/storage';

export function checkLogin(state, replace) {
  if (!Storage.get(AUTH_DATA)) {
    replace('/signin');
  }
}

export function getJWT() {
  return Storage.get(JWT_STORAGE_KEY);
}

export function saveJWT(jwt) {
  return Storage.set(JWT_STORAGE_KEY, jwt);
}

export function getCachedUserId() {
  return Storage.get(CACHED_USERID);
}

export function saveAuthData(response) {
  console.log(response);

  Storage.set(CACHED_USERID, response.user.id);
  Storage.set(CACHED_USERNAME, response.user.username);
  Storage.set(CACHED_USEREMAIL, response.user.email);
  saveJWT(response.jwt);
}

export function getAuthData(key) {
  const authData = JSON.parse(Storage.get(AUTH_DATA)) || {};
  if (key) return authData[key];
  return authData;
}
