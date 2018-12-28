//

import { Map, fromJS } from 'immutable';
import Actions from '../actions/actions';

export function user(state = fromJS({}), action) {
  switch (action.type) {
    case Actions.QUERY_USER_INFOMATION_WITH_EMAIL.REQUEST:
    case Actions.QUERY_USER_INFOMATION_WITH_EMAIL.FINISH:
      return state.delete('inviteParticipant');
    case Actions.QUERY_USER_INFOMATION_WITH_EMAIL.SUCCESS:
      return state.set('inviteParticipant', fromJS(action.payload));

    case Actions.CHANGE_PASSWORD.REQUEST:
      return {
        ...state,
        changePasswordFetching: true
      };

    case Actions.CHANGE_PASSWORD.SUCCESS:
      return {
        ...state,
        changePasswordFetching: false,
        changePasswordSuccess: true
      };

    case Actions.CHANGE_PASSWORD.FAILURE:
      return {
        ...state,
        changePasswordFetching: false,
        changePasswordSuccess: false
      };

    default:
      return state;
  }
}
