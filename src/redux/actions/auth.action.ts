import { FSAction } from './actions';

export function logout(): FSAction {
  return {
    type: 'APP_LOGOUT'
  };
}
