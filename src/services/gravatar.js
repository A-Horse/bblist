import md5 from "blueimp-md5";
import { Storage } from "./storage";

const gravatarUrlBase = "https://www.gravatar.com/avatar/";

export function makeGravatarHash(email) {
  return md5(email.trim().toLowerCase());
}

export function makeGravatarUrl(email, size) {
  const urlQuery = size
    ? makeGravatarHash(email) + `?s=${size}`
    : makeGravatarHash(email);
  return gravatarUrlBase.concat(urlQuery);
}

export function getUserGravatorFromStorge(userId, size = 80) {
  return Storage.get(`GRAVATAR_USER_${userId}_SIZE_${size}`);
}

export function saveUserGravatorToStorge(userId, base64, size = 80) {
  return Storage.set(`GRAVATAR_USER_${userId}_SIZE_${size}`, base64);
}
