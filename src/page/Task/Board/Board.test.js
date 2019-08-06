import React from 'react';
import Board from './ProjectPage';
import renderer from './node_modules/react-test-renderer';
import { fromJS } from 'immutable';
import { MemoryRouter } from 'react-router';

test('TaskBoard', () => {
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

  const actions = {
    GET_TASK_BOARD_REQUEST: jest.fn()
  };
  const cardMap = fromJS({
    '20': {
      created_at: null,
      taskBoardId: 15,
      isDone: 0,
      executorId: null,
      ownerId: null,
      createrId: 2,
      index: 1,
      status: null,
      owner: {},
      creater: { email: 'chenfangwei@outlook.com', id: 2 },
      updated_at: null,
      title: 'I am card',
      content: null,
      sprint: null,
      id: 20,
      taskTrackId: 21
    }
  });
  const trackMap = fromJS({
    '21': {
      id: 21,
      taskBoardId: 15,
      index: 1,
      name: 'Track No.1',
      type: null,
      cards: [20]
    }
  });
  const match = {
    params: {
      boardId: 15
    }
  };
  const history = {};

  const tree = renderer.create(
    <MemoryRouter>
      <Board
        board={board}
        trackMap={trackMap}
        cardMap={cardMap}
        actions={actions}
        match={match}
        history={history}
      />
    </MemoryRouter>
  );
  expect(tree).toMatchSnapshot();
});
