import md5 from 'blueimp-md5';

const gravatarUrlBase = 'https://www.gravatar.com/avatar/';

export function makeGravatarHash(email) {
  return md5(email.trim().toLowerCase());
}

export function makeGravatarUrl(email, size) {
  const urlQuery = size ? makeGravatarHash(email) + `?s=${size}` : makeGravatarHash(email);
  return gravatarUrlBase.concat(urlQuery);
}

export function getGravatorFromStorge(email, size) {
  
}
