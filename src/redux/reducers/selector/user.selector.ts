import { RootState } from '../index';
import { AppUserInfoRecord } from '../../../typings/user/user.typing';
import { List } from 'immutable';

export function findProjectAllUsers(
  state: RootState,
  projectID: string
): List<AppUserInfoRecord> {
  const projectUsersID: List<string> | undefined = state.user
    .get('projectUsersID')
    .get(projectID);
  if (!projectUsersID) {
    return List();
  }

  return projectUsersID
    .map(ID => {
      return state.user.get('userMap').get(ID.toString())!;
    })
    .filter(u => u);
}
