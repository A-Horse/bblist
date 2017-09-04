import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from 'actions/login';
import { JWT_STORAGE_KEY } from '../constants';
import { Storage } from 'services/storage';
import { AUTH_SUCCESS } from 'actions/login';
import { saveAuthData, saveJWT } from 'utils/auth';

// TODO combine
function signin(
  state = {
    isAuthenticated: Storage.get(JWT_STORAGE_KEY) ? true : false,
    isFetching: false
  },
  action
) {
  switch (action.type) {
    case AUTH_SUCCESS:
      saveJWT(action.playload.jwt);
      return {
        ...state
      };
      break;

    default:
      return state;
  }
}

export default signin;
