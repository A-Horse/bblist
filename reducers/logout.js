import { Storage } from '../services/storage';
import {
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE
} from 'actions/logout';

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
    Storage.clear();
    return Object.assign({}, state, {
      isFetching: false
    });
    break;
  case LOGOUT_FAILURE:
    return Object.assign({}, state, {
      isFetching: false
    });
    break;

  default:
    return state;
  }
}

export default logout;
