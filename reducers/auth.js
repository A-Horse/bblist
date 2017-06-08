import {
  LOGIN_AUTH_REQUEST, LOGIN_AUTH_SUCCESS, LOGIN_AUTH_FAILURE,
} from '../actions/login';
import { Storage } from 'services/storage';
import { JWT_STORAGE_KEY } from '../constants';

function auth(state = {
  isAuthenticated: Storage.get(JWT_STORAGE_KEY) ? true : false,
  isFetching: true
}, action) {
  switch (action.type) {
  case LOGIN_AUTH_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      isAuthenticated: false
    });
    break;
  case LOGIN_AUTH_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: true,
      loginedUser: action.user
    });
    break;
  case LOGIN_AUTH_FAILURE:
    // TODO remove data when jwt expries
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: false,
      message: action.message
    });
    break;
  default:
    return state;
  }
}

export default auth;
