import history from '../services/history';

export function activeClassWhenMatchPrefix(prefix) {
  return testLoactionMatchPrefix(prefix) ? 'active' : '';
}

export function testLoactionMatchPrefix(prefix) {
  return new RegExp('^' + prefix).test(history.location.pathname);
}
