import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
} from 'actions/login';
import { Storage } from 'services/storage';
import { JWT_STORAGE_KEY, CACHED_USERNAME, CACHED_USERID, CACHED_USEREMAIL } from '../constants';
import { saveAuthData } from 'utils/auth';

function signin(state = {
  // isAuthenticated: Storage.get(JWT_STORAGE_KEY) ? true : false
}, action) {
  switch (action.type) {
  case LOGIN_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      user: action.creds
    });
    break;
  case LOGIN_SUCCESS:
    const cachedData = {};
    cachedData[CACHED_USEREMAIL] = action.user.email;
    cachedData[CACHED_USERID] = action.user.id;
    cachedData[CACHED_USERNAME] = action.user.username;
    saveAuthData(action.jwt, cachedData);
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
