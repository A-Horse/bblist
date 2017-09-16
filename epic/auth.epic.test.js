import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { IDENTIFY_REQUEST, LOGIN_REQUEST } from './auth.epic.js';
import { timeout } from '../utils/timeout';

const rootEpic = combineEpics(IDENTIFY_REQUEST, LOGIN_REQUEST);
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

  test('IDENTIFY_REQUEST', async () => {
    nock('http://ocotpuese.xyz')
      .get('/api/user/identify')
      .reply(200, { jwt: 'jwt' });
    store.dispatch({ type: 'IDENTIFY_REQUEST' });
    await timeout(10);
    nock.isDone();
    expect(store.getActions()).toEqual([
      { type: 'IDENTIFY_REQUEST' },
      { type: 'IDENTIFY_SUCCESS', playload: { jwt: 'jwt' } }
    ]);
  });

  test('LOGIN_REQUEST', async () => {
    nock('http://ocotpuese.xyz')
      .post('/api/signin', { email: 'octopus@octopus.com', password: '1234567' })
      .reply(200, { user: { username: 'octopus' }, jwt: 'jwt' });

    store.dispatch({
      type: 'LOGIN_REQUEST',
      playload: { email: 'octopus@octopus.com', password: '1234567' }
    });

    await timeout(10);
    nock.isDone();
    expect(store.getActions()).toEqual([
      { type: 'LOGIN_REQUEST', playload: { email: 'octopus@octopus.com', password: '1234567' } },
      {
        type: 'LOGIN_SUCCESS',
        playload: { user: { username: 'octopus' }, jwt: 'jwt' }
      }
    ]);
  });
});
