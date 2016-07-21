'use strict';

const md5 = require('blueimp-md5');

const gravatarUrlBase = 'https://www.gravatar.com/avatar/';

export function makeGravatarHash(email) {
  return md5(email.trim().toLowerCase());
}

export function makeGravatarUrl(email, size) {
  if( size ){
    return gravatarUrlBase.concat(makeGravatarHash(email) + `?s=${size}`);
  } 
  return gravatarUrlBase.concat(makeGravatarHash(email));
}
