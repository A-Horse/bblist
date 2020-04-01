import * as R from 'ramda';
import Actions from '../actions/actions';
import { Map, fromJS } from 'immutable';

export function auth(state = Map({}), action) {
  switch (action.type) {
    case Actions.SETUP_USER.REQUEST:
      return state.set('loginedUser', fromJS(action.payload));

    case Actions.SIGNUP.SUCCESS:
      return state.set('signUpSuccess', true);

    case Actions.SIGNUP.FINISH:
      return state.delete('signUpSuccess');

    case Actions.LOGOUT.REQUEST:
      return state;

    case Actions.LOGOUT.FINISH:
      return state;

    default:
      return state;
  }
}
