import React from 'react';
import BoardWall from './BoardWall';
import { MemoryRouter } from 'react-router';
import renderer from 'react-test-renderer';
import { fromJS } from 'immutable';

test('Button', () => {
  const actions = {
    GET_TASK_ALL_BOARD_REQUEST: jest.fn()
  };
  const boardMap = fromJS({
    '3': {
      created_at: null,
      name: 'sdssdsdsdsssdsd!!!sd',
      ownerId: 1,
      createrId: null,
      isPublic: 0,
      updated_at: null,
      cover: 'board-cover/c4e4c-a7e6f-53ac2-165f9',
      sprint: null,
      type: 'NORMAL',
      id: 3
    },
    '10': {
      created_at: null,
      name: 'jkj',
      ownerId: 1,
      createrId: null,
      isPublic: 0,
      updated_at: null,
      cover: null,
      sprint: null,
      type: 'NORMAL',
      id: 10
    }
  });
  const tree = renderer.create(
    <MemoryRouter>
      <BoardWall actions={actions} boardMap={boardMap} />
    </MemoryRouter>
  );
  expect(tree).toMatchSnapshot();
  expect(actions.GET_TASK_ALL_BOARD_REQUEST.mock.calls.length).toBe(1);
});
