import { fromJS, List } from 'immutable';
import { findProjectAllUsers } from './user.selector';
import { AppUserInfoRecord } from '../../../typings/user/user.typing';

test('findProjectAllUsers', () => {
  const state = {
    user: fromJS({
      projectUsersID: {
        project1: ['u1', 'u2']
      },
      userMap: {
        u1: {
          id: 'u1',
          name: '云无月'
        },
        u2: {
          id: 'u1',
          name: 'Chief'
        }
      }
    })
  };

  const users: List<AppUserInfoRecord> = findProjectAllUsers(
    state as any,
    'project1'
  );
  expect(users.size).toEqual(2);
});
