import { fromJS } from 'immutable';
import Actions from 'actions/actions';

export function user(state = fromJS({}), action) {
  switch (action.type) {
    case Actions.QUERY_USER_INFOMATION_WITH_EMAIL.REQUEST:
    case Actions.QUERY_USER_INFOMATION_WITH_EMAIL.FINISH:
      return state.delete('inviteParticipant');
      break;
    case Actions.QUERY_USER_INFOMATION_WITH_EMAIL.SUCCESS:
      return state.set('inviteParticipant', fromJS(action.payload));
      break;

    default:
      return state;
  }
}
