import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { LOGIN_REQUEST } from './auth.epic.js';
import { timeout } from '../utils/timeout';

const rootEpic = combineEpics( LOGIN_REQUEST);
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

  test('LOGIN_REQUEST', async () => {
    nock('http://ocotpuese.xyz')
      .post('/api/signin', {
        email: 'octopus@octopus.com',
        password: '1234567'
      })
      .reply(200, {
        user: { username: 'octopus', email: 'test@ocotpus.com', id: 34 },
        jwt: 'jwt'
      });

    store.dispatch({
      type: 'LOGIN_REQUEST',
      payload: { email: 'octopus@octopus.com', password: '1234567' }
    });

    await timeout(10);
    nock.isDone();
    expect(store.getActions()).toEqual([
      {
        type: 'LOGIN_REQUEST',
        payload: { email: 'octopus@octopus.com', password: '1234567' }
      },
      {
        type: 'LOGIN_SUCCESS',
        payload: {
          user: {
            username: 'octopus',
            email: 'test@ocotpus.com',
            id: 34
          },
          jwt: 'jwt'
        }
      }
    ]);
  });
});
