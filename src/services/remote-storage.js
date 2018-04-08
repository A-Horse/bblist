import { REMOTE_STORAGE } from '../constants';

export function makeRemoteUrl(path) {
  return `${REMOTE_STORAGE}/${path}`;
}
