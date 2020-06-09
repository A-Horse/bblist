import { RootState } from '../index';
import { DisplayAccount } from '../../../typings/user.typing';

export function findProjectAllUsers(
  state: RootState,
  projectId: string
): DisplayAccount[] {
  return state.user.projectParticipants;
}
