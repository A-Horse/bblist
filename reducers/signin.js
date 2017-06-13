import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
} from 'actions/login';
import { Storage } from 'services/storage';
import { JWT_STORAGE_KEY, CACHED_USERNAME, CACHED_USERID, CACHED_USEREMAIL } from '../constants';
import {
  UPDATE_USERINFO_REQUEST, UPDATE_USERINFO_SUCCESS, UPDATE_USERINFO_FAILURE
} from 'actions/user';
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


  default:
    return state;
  }
}

export default signin;
