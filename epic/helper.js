import fetch from 'isomorphic-fetch';

import { createConfigWithAuth } from '../utils/header';

export const http = {
  get(url, query) {
    return fetch(url, createConfigWithAuth('GET'));
  }
};
