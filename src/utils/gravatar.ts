import md5 from 'blueimp-md5';
import { Storage } from '../services/storage';

const GravatarUrlBase = 'https://www.gravatar.com/avatar/';

export function makeGravatarHash(email) {
  return md5(email.trim().toLowerCase());
}

export function makeGravatarUrl(email, size = 80) {
  const urlQuery = size
    ? makeGravatarHash(email) + `?s=${size}`
    : makeGravatarHash(email);
  return GravatarUrlBase.concat(urlQuery);
}

export function getUserGravatarFromStorage(userId, size = 80) {
  return Storage.get(`GRAVATAR_USER_${userId}_SIZE_${size}`);
}
