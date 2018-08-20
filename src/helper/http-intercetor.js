// @flow
import axios from 'axios';

export function setupAxiosJwtHeader(jwt: string) {
  axios.defaults.headers.common['jwt-token'] = `${jwt}`;
}
