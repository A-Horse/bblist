import { user, UserReducerState } from './user.reducer';
import { getAllUsersSuccess } from '../actions/user/user.action';
import { fromJS, Record } from 'immutable';

test('get_all_users_success', () => {
  const nextState: Record<UserReducerState> = user(
    undefined,
    getAllUsersSuccess('p1', [
      {
        id: 1,
        username: 'fwchen',
        email: 'fwchen@octopus.com'
      }
    ])
  );
  expect(
    nextState
      .get('projectUsersID')
      .get('p1')!
      .toArray()
  ).toEqual([1]);
  expect(
    nextState
      .get('userMap')
      .get('1')!
      .equals(
        fromJS({
          id: 1,
          username: 'fwchen',
          email: 'fwchen@octopus.com'
        })
      )
  ).toBeTruthy();
});
