import { IDENTIFY_REQUEST, IDENTIFY_SUCCESS, IDENTIFY_FAILURE } from '../actions/login';
import {
  UPDATE_USERINFO_REQUEST,
  UPDATE_USERINFO_SUCCESS,
  UPDATE_USERINFO_FAILURE
} from '../actions/login';
import { Storage } from 'services/storage';
import { JWT_STORAGE_KEY } from '../constants';
import Actions from 'actions/actions';

function auth(
  state = {
    isAuthenticated: Storage.get(JWT_STORAGE_KEY) ? true : false,
    isFetching: true
  },
  action
) {
  switch (action.type) {
    case Actions.IDENTIFY.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      });
      break;
    case Actions.IDENTIFY.SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        loginedUser: action.playload
      });
      break;
    case Actions.IDENTIFY.FAILURE:
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
      return Object.assign({}, state, {});
      break;

    default:
      return state;
  }
}

export default auth;
