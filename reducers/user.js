import {
  UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAILURE
} from 'actions/user';

function user(state = {
  isFetching: false
}, action) {
  switch ( action.type ) {
  case UPDATE_PASSWORD_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      user: action.user
    });
    break;
  case UPDATE_PASSWORD_SUCCESS:
    return Object.assign({}, state, {
      isFetching: true,
      user: action.user
    });
    break;
  case UPDATE_PASSWORD_FAILURE:
    return Object.assign({}, state, {
      isFetching: true,
      message: action.message
    });
    break;
  default:
    return state;
  }
}

export default user;
