import React from 'react';
import TaskCard from './TaskCard';
import renderer from 'react-test-renderer';
import { fromJS } from 'immutable';

test('TaskCard', () => {
  const card = fromJS({
    id: 23,
    title: 'sdsd!!!',
    taskListId: 17,
    sprint: null,
    createrId: 2,
    ownerId: null,
    executorId: null,
    id: 23,
    index: 4,
    isDone: 1,
    owner: {},
    ownerId: null,
    sprint: null,
    status: null,
    taskListId: 17,
    taskWallId: 15,
    title: 'taskcard',
    updated_at: null,
    creater: {
      name: 'God',
      email: 'god@ocotpus.com',
      id: 0
    }
  });

  const tree = renderer.create(<TaskCard card={card} />);
  expect(tree).toMatchSnapshot();
});
