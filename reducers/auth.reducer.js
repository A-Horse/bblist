import { IDENTIFY_REQUEST, IDENTIFY_SUCCESS, IDENTIFY_FAILURE } from '../actions/login';
import {
  UPDATE_USERINFO_REQUEST,
  UPDATE_USERINFO_SUCCESS,
  UPDATE_USERINFO_FAILURE
} from '../actions/login';
import R from 'ramda';
import { Storage } from 'services/storage';
import { JWT_STORAGE_KEY } from '../constants';
import Actions from 'actions/actions';
import { Map, List, fromJS } from 'immutable';

function auth(state = Map({}), action) {
  console.log(action);

  switch (action.type) {
    case Actions.IDENTIFY.REQUEST:
      return state.update('identifyFetching', R.T).update('identifyAuthenticated', R.F);
      break;
    case Actions.IDENTIFY.SUCCESS:
      return state
        .update('identifyFetching', R.F)
        .update('identifyAuthenticated', R.T)
        .update('loginedUser', () => fromJS(action.playload));
      break;
    case Actions.IDENTIFY.FAILURE:
      return state.update('identifyFetching', R.F).update('identifyAuthenticated', R.F);
      break;

    case Actions.LOGIN.REQUEST:
      return state.delete('signInErrorMessage');
      break;

    case Actions.LOGIN.SUCCESS:
      return state.update('signInAuthenticated', R.T);
      break;

    case Actions.LOGIN.FAILURE:
      return state
        .update('signInAuthenticated', R.F)
        .update('signInErrorMessage', () => action.playload);
      break;

    case Actions.LOGIN_FINISH.REQUEST:
      return state.delete('signInAuthenticated').delete('signInErrorMessage');
      break;

    case Actions.LOGOUT.REQUEST:
      return state;
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
