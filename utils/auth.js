import {JWT_STORAGE_KEY} from '../constants';
import {Storage} from '../services/storage';

export function checkLogin(state, replace) {
  if(!Storage.get(JWT_STORAGE_KEY) ){
    replace('/login');
  }
}

export function clearJWT() {
  Storage.remove(JWT_STORAGE_KEY);
}
