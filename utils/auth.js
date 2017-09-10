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
  const authData = getAuthData();
  return authData[JWT_STORAGE_KEY];
}

export function saveJWT(jwt) {
  // TODO 这里非常不纯 refactor
  const authData = getAuthData();
  authData[JWT_STORAGE_KEY] = jwt;
  return Storage.set(AUTH_DATA, JSON.stringify(authData));
}

export function getCachedUserId() {
  return getAuthData(CACHED_USERID);
}

export function saveCachedData(data) {
  const authData = getAuthData();
  return Storage.set(AUTH_DATA, JSON.stringify(Object.assign({}, authData, data)));
}

export function saveAuthData(playload) {
  const cachedData = {};
  cachedData[CACHED_USEREMAIL] = playload.user.email;
  cachedData[CACHED_USERID] = playload.user.id;
  cachedData[CACHED_USERNAME] = playload.user.username;

  saveJWT(playload.jwt);
  saveCachedData(cachedData);
}

export function getAuthData(key) {
  const authData = JSON.parse(Storage.get(AUTH_DATA)) || {};
  if (key) return authData[key];
  return authData;
}
