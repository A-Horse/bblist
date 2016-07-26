'use strict';

export function createConfig(method, body, headers){
  return {
    method: method,
    headers: {
      'content-type':'application/json',
      ...headers
    },
    body
  };
}


export function createConfigWithAuth(method, body, headers) {
  return createConfig(method, body, {
    'jwts-token': localStorage.getItem('jwts-token')
  })
}
