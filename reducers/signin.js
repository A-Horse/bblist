import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
} from 'actions/login';
import { Storage } from 'services/storage';
import { JWT_STORAGE_KEY } from '../constants';
import { AUTH_SUCCESS } from 'actions/login';
import { saveJWT } from 'utils/auth';

// TODO combine

function signin(state = {
  isAuthenticated: Storage.get(JWT_STORAGE_KEY) ? true : false,
  isFetching: false
}, action) {
  switch (action.type) {
  case LOGIN_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      user: action.creds
    });
    break;
  case LOGIN_SUCCESS:
    saveJWT(action.jwt);
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: true
    });
    break;
  case LOGIN_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: false,
      errorMessage: action.message
    });
    break;

  case AUTH_SUCCESS:
    saveJWT(action.jwt);
    return {
      ...state
    };
    break;


  default:
    return state;
  }
}

export default signin;
