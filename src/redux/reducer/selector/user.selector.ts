import { RootState } from '../index';
import { DisplayAccount } from '../../../typings/user.typing';

export function selectProjectAllUsers(
  state: RootState,
  projectId: string
): DisplayAccount[] {
  return state.user.projectParticipants;
}

export function selectUser(state: RootState, userId: string) {
  return state.user.projectParticipants.find(user => user.id === userId);
}
