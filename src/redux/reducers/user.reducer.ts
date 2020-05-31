import { fromJS, List, Map, Record } from 'immutable';
import { AppUserInfoRecord } from '../../typings/user/user.typing';
import { FSAction } from '../actions/actions';
import { GET_ALL_USERS_SUCCESS } from '../actions/user/user.action';
import { normalize } from 'normalizr';
import { UserEntityList } from '../schema';

type UserMap = Map<string, AppUserInfoRecord>;
type ProjectUserIdMap = Map<string, List<string>>;

export interface UserReducerState {
  userMap: UserMap;
  projectUsersID: ProjectUserIdMap;
}

export function user(
  state: Record<UserReducerState> = fromJS({
    userMap: {},
    projectUsersID: {},
  }),
  action: FSAction
): Record<UserReducerState> {
  switch (action.type) {
    case GET_ALL_USERS_SUCCESS: {
      const normalized = normalize(action.payload.users, UserEntityList);
      return state
        .updateIn(['userMap'], (userMap: UserMap) => {
          return userMap.mergeWith((oldRecord, newRecord) => {
            if (oldRecord.equals(newRecord)) {
              return oldRecord;
            }
            return newRecord;
          }, fromJS(normalized.entities.User));
        })
        .updateIn(
          ['projectUsersID', action.payload.projectID],
          (usersID: List<string>) => {
            const newList = List(normalized.result);
            if (newList.equals(usersID)) {
              return usersID;
            }
            return newList;
          }
        );
    }
    default:
      return state;
  }
}
