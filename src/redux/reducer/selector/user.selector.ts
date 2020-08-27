import { RootState } from '../index';
import { DisplayAccount } from '../../../typings/user.typing';

export function selectProjectAllUsers(
  state: RootState,
  projectId: string
): DisplayAccount[] {
  return state.user.projectParticipants;
}

export function selectUser(state: RootState, userId: string) {

}
