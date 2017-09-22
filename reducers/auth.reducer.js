import {
  UPDATE_USERINFO_REQUEST,
  UPDATE_USERINFO_SUCCESS,
  UPDATE_USERINFO_FAILURE
} from '../actions/login';
import R from 'ramda';
import Actions from 'actions/actions';
import { Map, fromJS } from 'immutable';

function auth(state = Map({}), action) {
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

    case Actions.LOGIN.FINISH:
      return state.delete('signInAuthenticated').delete('signInErrorMessage');
      break;

    case Actions.SIGNUP.SUCCESS:
      return state.set('signUpSuccess', true);
      break;

    case Actions.SIGNUP.FINISH:
      return state.delete('signUpSuccess');
      break;

    case Actions.LOGOUT.REQUEST:
      return state;
      break;

    case Actions.LOGOUT.FINISH:
      return state;
      break;

    case Actions.UPDATE_USER.SUCCESS:
      console.log(fromJS(action.playload));

      return state.update('loginedUser', loginedUser => loginedUser.merge(fromJS(action.playload)));
      break;

    default:
      return state;
  }
}

export default auth;
