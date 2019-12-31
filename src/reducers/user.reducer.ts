import { fromJS, List, Record, Map } from 'immutable';
import { AppUserInfoRecord } from '../typings/user/user.typing';
import { FSAction } from '../actions/actions';
import { GET_ALL_USERS_SUCCESS } from '../actions/user/user.action';
import { normalize } from 'normalizr';
import { ProjectEntity } from '../schema';

type UserMap = Map<string, AppUserInfoRecord>;
type ProjectUserIdMap = Map<string, List<string>>;

export interface UserReducerState {
  userMap: UserMap;
  projectUsersID: ProjectUserIdMap;
}

export function user(
  state: Record<UserReducerState> = fromJS({
    users: {},
    projectUsersID: {}
  }),
  action: FSAction
) {
  switch (action.type) {
    case GET_ALL_USERS_SUCCESS: {
      const normalized = normalize(action.payload.users, ProjectEntity);
      return state
        .updateIn(['userMap'], (userMap: UserMap) => {
          return userMap.merge(fromJS(normalized.entities.User));
        })
        .updateIn(
          ['projectUsersID', action.payload.projectID],
          (usersID: List<string>) => {
            return List(normalized.result);
          }
        );
    }
    default:
      return state;
  }
}
