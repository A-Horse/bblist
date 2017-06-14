import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
} from 'actions/login';
import {AUTH_DATA, JWT_STORAGE_KEY, CACHED_USERNAME, CACHED_USERID, CACHED_USEREMAIL} from '../constants';
import { Storage } from 'services/storage';
import { AUTH_SUCCESS } from 'actions/login';
import { saveAuthData, saveJWT } from 'utils/auth';

// TODO combine

function signin(state = {
  isAuthenticated: Storage.get(JWT_STORAGE_KEY) ? true : false,
  isFetching: false
}, action) {
  switch (action.type) {
  case LOGIN_REQUEST:
    return {
      ...state,
      isFetching: true,
      user: action.creds
    };
    break;
  case LOGIN_SUCCESS:
    saveAuthData(action.playload);
    return {
      ...state,
      isFetching: false,
      isAuthenticated: true
    };
    break;
  case LOGIN_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: false,
      errorMessage: action.message
    });
    break;

  case AUTH_SUCCESS:
    saveJWT(action.playload.jwt);
    return {
      ...state
    };
    break;


  default:
    return state;
  }
}

export default signin;
