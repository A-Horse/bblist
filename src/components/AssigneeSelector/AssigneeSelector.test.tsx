import renderer from 'react-test-renderer';
import { AssigneeSelector } from './AssigneeSelector';
import React from 'react';
import { createTestProvider } from '../../../test/TestReduxProvider';
import { fromJS } from 'immutable';

test('AssigneeSelector snapshot', () => {
  const Provider = createTestProvider({
    user: fromJS({
      userMap: {
        '10': {
          id: 10,
          username: '巫昭',
        },
        '11': {
          id: 11,
          username: '云天河',
        },
      },
      projectUsersID: {
        p1: [10, 11],
      },
    }),
  });
  const assigneeSelector = renderer
    .create(
      <Provider>
        <AssigneeSelector projectId={'p1'} />
      </Provider>
    )
    .toJSON();
  expect(assigneeSelector).toMatchSnapshot();
});
