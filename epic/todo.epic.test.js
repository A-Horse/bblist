import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { ADD_TODO_REQUEST } from './todo.epic.js';
import { timeout } from '../utils/timeout';

const rootEpic = combineEpics(ADD_TODO_REQUEST);
const epicMiddleware = createEpicMiddleware(rootEpic);
const mockStore = configureMockStore([epicMiddleware]);

describe('auth epic test', () => {
  let store;

  beforeAll(() => {
    store = mockStore();
  });

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    nock.cleanAll();
    epicMiddleware.replaceEpic(rootEpic);
  });

  test('ADD TODO REQUEST', async () => {
    const playload = {
      content: 'i want to add this todo',
      deadline: '2017-9-31'
    };
    nock('http://ocotpuese.xyz')
      .post('/api/todo', playload)
      .reply(200, { ...playload });
    // .log(console.log);

    store.dispatch({
      type: 'ADD_TODO_REQUEST',
      playload: playload
    });

    await timeout(10);
    nock.isDone();
    expect(store.getActions()).toEqual([
      { type: 'ADD_TODO_REQUEST', playload },
      { type: 'ADD_TODO_SUCCESS', playload: { ...playload } }
    ]);
  });
});
