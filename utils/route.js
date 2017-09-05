import history from '../services/history';

export function activeClassWhenMatchPrefix(prefix) {
  return new RegExp('^' + prefix).test(history.location.pathname) ? 'active' : '';
}
