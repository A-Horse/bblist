
import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE
} from '../actions/sign-up';

function signup(state = {
  isFetching: false
}, action) {
  switch ( action.type ) {
  case SIGNUP_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      user: action.user
    });
    break;
  case SIGNUP_SUCCESS:
    return Object.assign({}, state, {
      isFetching: true,
      user: action.user
    });
    break;
  case SIGNUP_FAILURE:
    return Object.assign({}, state, {
      isFetching: true,
      message: action.message
    });
    break;
  default:
    return state;
  }
}

export default signup;
