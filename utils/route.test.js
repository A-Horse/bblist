import history from '../services/history';
import { activeClassWhenMatchPrefix } from './route';

test('route utils', () => {
  history.location.pathname = '/todo';
  expect(activeClassWhenMatchPrefix('/todo')).toEqual('active');
  expect(activeClassWhenMatchPrefix('/task')).toEqual('');

  history.location.pathname = '/todo/1';
  expect(activeClassWhenMatchPrefix('/todo')).toEqual('active');
  expect(activeClassWhenMatchPrefix('/task')).toEqual('');
});
