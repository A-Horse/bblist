import {API_PREFIX} from '../constants';

export function makeApiUrl(path) {
  return `${API_PREFIX}${path}`;
}
