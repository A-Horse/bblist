import { FSAction } from './actions';
import { LoginRequestInput } from '../../typings/auth.typing';
import { AxiosResponse } from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export interface ActionLoginRequest extends FSAction {
  payload: {
    username: string;
    password: string;
  };
  meta: {
    onSuccess: Function;
    onError: Function;
  };
}

export function loginRequest(
  loginRequestInput: LoginRequestInput
): ActionLoginRequest {
  return {
    type: LOGIN_REQUEST,
    payload: {
      username: loginRequestInput.username,
      password: loginRequestInput.password
    },
    meta: {
      onSuccess: loginRequestInput.onSuccess,
      onError: loginRequestInput.onError
    }
  };
}

export function loginSuccess(): FSAction {
  return {
    type: LOGIN_SUCCESS
  };
}

export function loginFailure(response: AxiosResponse): FSAction {
  return {
    type: LOGIN_FAILURE,
    error: true,
    payload: response
  };
}
