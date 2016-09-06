import {AUTH_DATA, JWT_STORAGE_KEY, CACHED_USERNAME, CACHED_USERID, CACHED_USEREMAIL} from '../constants';
import {Storage} from '../services/storage';

export function checkLogin(state, replace) {
  if(!Storage.get(JWT_STORAGE_KEY) ){
    replace('/login');
  }
}

export function getJWT() {
  const authData = getAuthData();
  return authData[JWT_STORAGE_KEY];
}

export function saveJWT(jwt) {
  const authData = getAuthData();
  authData[JWT_STORAGE_KEY] = jwt;
  return Storage.set(AUTH_DATA, JSON.stringify(authData));
}

export function setCachedData(data) {
  const authData = getAuthData();
  return Storage.set(AUTH_DATA, JSON.stringify(Object.assign({}, authData, data)));
}

export function destoryCachedData() {
  return Storage.set(AUTH_DATA, getJWT());
}

export function saveAuthData(jwt, data) {
  saveJWT(jwt);
  saveAuthData(data);
}

export function getAuthData() {
  return JSON.parse(Storage.get(AUTH_DATA)) || {};
}

export function destoryAuthData() {
  Storage.remove(AUTH_DATA);
}
