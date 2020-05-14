import { SetProjectDefaultKanbanInput } from '../../typings/project.typing';
import { FSAction } from '../actions';

export const SET_PROJECT_DEFAULT_KANBAN_REQUEST =
  'SET_PROJECT_DEFAULT_KANBAN_REQUEST';
export const SET_PROJECT_DEFAULT_KANBAN_SUCCESS =
  'SET_PROJECT_DEFAULT_KANBAN_SUCCESS';
export const SET_PROJECT_DEFAULT_KANBAN_FAILURE =
  'SET_PROJECT_DEFAULT_KANBAN_FAILURE';

export function setProjectDefaultKanbanRequest(
  setProjectDefaultKanbanInput: SetProjectDefaultKanbanInput
): FSAction {
  return {
    type: SET_PROJECT_DEFAULT_KANBAN_REQUEST,
    payload: setProjectDefaultKanbanInput,
  };
}

export function setProjectDefaultKanbanSuccess(payload: {
  projectID: string;
}): FSAction {
  return {
    type: SET_PROJECT_DEFAULT_KANBAN_SUCCESS,
    payload,
  };
}

export function setProjectDefaultKanbanFailure(): FSAction {
  return {
    type: SET_PROJECT_DEFAULT_KANBAN_FAILURE,
    error: true,
  };
}
