import React from 'react';
import Infomation from './Infomation';
import renderer from 'react-test-renderer';
import { fromJS } from 'immutable';

const board = fromJS({
  tracks: [21],
  created_at: null,
  name: 'sdsd!',
  ownerId: 2,
  createrId: null,
  isPublic: 0,
  updated_at: null,
  cover: 'board-cover/71d40-59335-ce623-3dbb3',
  sprint: null,
  type: 'NORMAL',
  id: 15
});

test('Infomation', () => {
  const actions = {};
  const tree = renderer.create(<Infomation actions={actions} board={board} />);
  expect(tree).toMatchSnapshot();
});
