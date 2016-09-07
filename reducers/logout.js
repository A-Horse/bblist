import {
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE
} from '../actions/logout';

function logout(state = {
  isFetching: false
}, action) {
  switch (action.type) {
  case LOGOUT_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
    break;
  case LOGOUT_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      goalList: action.goalList
    });
    break;
  case LOGOUT_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      message: action.message
    });
    break;

  default:
    return state;
  }
}

export default logout;
