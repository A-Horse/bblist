import { FSAction } from '../actions/actions';
import { DisplayAccount } from '../../typings/user.typing';

export interface UserReducerState {
  projectParticipants: DisplayAccount[];
}

export function user(
  state: UserReducerState = {
    projectParticipants: [],
  },
  action: FSAction
): UserReducerState {
  switch (action.type) {
    case 'GET_PROJECT_USER_SUCCESS': {
      return {
        ...state,
        projectParticipants: action.payload.data,
      };
    }
    default:
      return state;
  }
}
