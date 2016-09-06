import {combineReducers} from 'redux';
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGIN_AUTH_REQUEST, LOGIN_AUTH_SUCCESS, LOGIN_AUTH_FAILURE,
} from '../actions/login';
import {Storage} from '../services/storage';
import {browserHistory} from 'react-router';
import {JWT_STORAGE_KEY, CACHED_USERNAME, CACHED_USERID, CACHED_USEREMAIL} from '../constants';
import {saveAuthData} from '../utils/auth';

function loginRedirect() {
  browserHistory.push('/home')
}

function auth(state = {
  isFetching: false,
  isAuthenticated: Storage.get(JWT_STORAGE_KEY) ? true : false
}, action) {
  switch (action.type) {
  case LOGIN_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      user: action.creds
    });
  case LOGIN_SUCCESS:
    const cachedData = {};
    cachedData[CACHED_USEREMAIL] = action.user.email;
    cachedData[CACHED_USERID] = action.user.id;
    cachedData[CACHED_USERNAME] = action.user.username; 
    saveAuthData(action.jwt, cachedData);
    loginRedirect();
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: true
    });
  case LOGIN_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: false,
      errorMessage: action.message
    });
  default:
    return state;
  }
}

function state(stte = {}, action) {
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
    })
    break;
  case LOGIN_AUTH_FAILURE:
    // TODO remove data when jwt expries
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: false,
      message: action.message
    });
  default:
    return state;
  }
}

const login = combineReducers({
  auth,
  state
});

export default login;
