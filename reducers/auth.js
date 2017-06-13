import {
  AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE,
} from '../actions/login';
import {
  UPDATE_USERINFO_REQUEST, UPDATE_USERINFO_SUCCESS, UPDATE_USERINFO_FAILURE
} from '../actions/login';
import { Storage } from 'services/storage';
import { JWT_STORAGE_KEY } from '../constants';

function auth(state = {
  isAuthenticated: Storage.get(JWT_STORAGE_KEY) ? true : false,
  isFetching: true
}, action) {
  switch (action.type) {
  case AUTH_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      isAuthenticated: false
    });
    break;
  case AUTH_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: true,
      loginedUser: action.user
    });
    break;
  case AUTH_FAILURE:
    // TODO remove data when jwt expries
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: false,
      message: action.message
    });
    break;

  case UPDATE_USERINFO_REQUEST:
    return Object.assign({}, state, {
      user: action.user
    });
    break;
  case UPDATE_USERINFO_SUCCESS:
    return Object.assign({}, state, {
      user: action.user
    });
    break;
  case UPDATE_USERINFO_FAILURE:
    return Object.assign({}, state, {

    });
    break;

  default:
    return state;
  }
}

export default auth;
