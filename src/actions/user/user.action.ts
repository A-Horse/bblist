import { FSAction } from '../actions';
import { Project } from '../../typings/project.typing';
import {AppUserInfo} from "../../typings/user/user.typing";

export const GET_ALL_USERS_REQUEST = 'GET_ALL_USERS_REQUEST';
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
export const GET_ALL_USERS_FAILURE = 'GET_ALL_USERS_FAILURE';

export function getAllUsersRequest(projectID: string): FSAction {
  return {
    type: GET_ALL_USERS_REQUEST,
    payload: {
      projectID
    }
  };
}

export function getAllUsersSuccess(projectID: string, users: AppUserInfo[]): FSAction {
  return {
    type: GET_ALL_USERS_SUCCESS,
    payload: {
      users,
      projectID
    }
  };
}

export function getAllUsersFailure(): FSAction {
  return {
    type: GET_ALL_USERS_FAILURE,
    error: true
  };
}
