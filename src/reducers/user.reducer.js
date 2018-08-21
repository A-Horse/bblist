// @flow

import { Map, fromJS } from 'immutable';
import Actions from '../actions/actions';

export function user(state: Map<any> = fromJS({}), action: FSAction) {
  switch (action.type) {
    case Actions.QUERY_USER_INFOMATION_WITH_EMAIL.REQUEST:
    case Actions.QUERY_USER_INFOMATION_WITH_EMAIL.FINISH:
      return state.delete('inviteParticipant');
    case Actions.QUERY_USER_INFOMATION_WITH_EMAIL.SUCCESS:
      return state.set('inviteParticipant', fromJS(action.payload));

    case Actions.CHANGE_PASSWORD.REQUEST:
      return state;

    case Actions.CHANGE_PASSWORD.SUCCESS:
      return state;

    default:
      return state;
  }
}
