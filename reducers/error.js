import {
  LOGIN_AUTH_FAILURE
} from '../actions/login';

function auth(state = {}, action) {
  switch (action.type) {
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
