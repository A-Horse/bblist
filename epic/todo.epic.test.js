import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { ADD_TODO_REQUEST, GET_TODOBOXS_REQUEST, GET_TODOLIST_REQUEST } from './todo.epic.js';
import { timeout } from '../utils/timeout';

const rootEpic = combineEpics(ADD_TODO_REQUEST, GET_TODOBOXS_REQUEST, GET_TODOLIST_REQUEST);
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

  test('GET_TODOBOXS_REQUEST', async () => {
    nock('http://ocotpuese.xyz')
      .get('/api/t/user/34/todo-box')
      .reply(200, [
        {
          id: 11,
          creatorId: 1,
          ownerId: 1,
          name: 'sdsd!!!!',
          type: 'normal',
          created_at: null,
          updated_at: null
        }
      ]);

    store.dispatch({
      type: 'GET_TODOBOXS_REQUEST',
      playload: {
        todoBoxId: null
      }
    });

    await timeout(10);
    nock.isDone();
    expect(store.getActions()).toEqual([
      { type: 'GET_TODOBOXS_REQUEST', playload: { todoBoxId: null } },
      {
        playload: [
          {
            created_at: null,
            creatorId: 1,
            id: 11,
            name: 'sdsd!!!!',
            ownerId: 1,
            type: 'normal',
            updated_at: null
          }
        ],
        type: 'GET_TODOBOXS_SUCCESS'
      }
    ]);
  });

  test('GET_TODOLIST_REQUEST with todoBoxId', async () => {
    nock('http://ocotpuese.xyz')
      .get('/api/t/todo-box/21')
      .reply(200, [
        {
          id: 11
        }
      ]);

    store.dispatch({
      type: 'GET_TODOLIST_REQUEST',
      playload: {
        todoBoxId: '21'
      }
    });

    await timeout(10);
    nock.isDone();
    expect(store.getActions()).toEqual([
      { playload: { todoBoxId: '21' }, type: 'GET_TODOLIST_REQUEST' },
      {
        playload: [
          {
            id: 11
          }
        ],
        type: 'GET_TODOLIST_SUCCESS'
      }
    ]);
  });
});
