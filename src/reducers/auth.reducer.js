//
import * as R from 'ramda';
import Actions from '../actions/actions';
import { Map, fromJS } from 'immutable';

export function auth(state = Map({}), action) {
  switch (action.type) {
    case Actions.SETUP_USER.REQUEST:
      return state.set('loginedUser', fromJS(action.payload));

    case Actions.LOGIN.REQUEST:
      return state.delete('signInErrorMessage');

    case Actions.LOGIN.SUCCESS:
      return state.update('signInAuthenticated', R.T);

    case Actions.LOGIN.FAILURE:
      return state
        .update('signInAuthenticated', R.F)
        .update('signInErrorMessage', () => action.payload);

    case Actions.LOGIN.FINISH:
      return state.delete('signInAuthenticated').delete('signInErrorMessage');

    case Actions.SIGNUP.SUCCESS:
      return state.set('signUpSuccess', true);

    case Actions.SIGNUP.FINISH:
      return state.delete('signUpSuccess');

    case Actions.LOGOUT.REQUEST:
      return state;

    case Actions.LOGOUT.FINISH:
      return state;

    case Actions.UPDATE_USER.SUCCESS:
      return state.update('loginedUser', loginedUser =>
        loginedUser.merge(fromJS(action.payload))
      );

    default:
      return state;
  }
}
