import {browserHistory} from 'react-router';
import {
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE
} from 'actions/logout';
import {destoryAuthData} from 'utils/auth';

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
    destoryAuthData();
    browserHistory.push('/logout');
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
