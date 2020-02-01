import {
  CreateKanbanColumnInput,
  CreateKanbanInput,
  Kanban
} from '../../typings/kanban.typing';
import { FSAction } from '../actions';

export const GET_PROJECT_KANBANS_REQUEST = 'GET_PROJECT_KANBANS_REQUEST';
export const GET_PROJECT_KANBANS_SUCCESS = 'GET_PROJECT_KANBANS_SUCCESS';
export const GET_PROJECT_KANBANS_FAILURE = 'GET_PROJECT_KANBANS_FAILURE';

export function getProjectKanbansRequest(payload: {
  projectId: string;
}): FSAction {
  return {
    type: GET_PROJECT_KANBANS_REQUEST,
    payload
  };
}

export function getProjectKanbansSuccess(payload: {
  projectId: string;
  kanbans: Kanban[];
}): FSAction {
  return {
    type: GET_PROJECT_KANBANS_SUCCESS,
    payload
  };
}

export function getProjectKanbansFailure(): FSAction {
  return {
    type: GET_PROJECT_KANBANS_FAILURE,
    error: true
  };
}

export const GET_PROJECT_KANBAN_DETAIL_REQUEST =
  'GET_PROJECT_KANBAN_DETAIL_REQUEST';
export const GET_PROJECT_KANBAN_DETAIL_SUCCESS =
  'GET_PROJECT_KANBAN_DETAIL_SUCCESS';
export const GET_PROJECT_KANBAN_DETAIL_FAILURE =
  'GET_PROJECT_KANBAN_DETAIL_FAILURE';

export function getProjectKanbanDetailRequest(payload: {
  kanbanId: string;
}): FSAction {
  return {
    type: GET_PROJECT_KANBAN_DETAIL_REQUEST,
    payload
  };
}

export function getProjectKanbanDetailSuccess(payload: {
  kanban: Kanban;
}): FSAction {
  return {
    type: GET_PROJECT_KANBAN_DETAIL_SUCCESS,
    payload
  };
}

export function getProjectKanbanDetailFailure(): FSAction {
  return {
    type: GET_PROJECT_KANBAN_DETAIL_FAILURE,
    error: true
  };
}

export const CREATE_KANBAN_REQUEST = 'CREATE_KANBAN_REQUEST';
export const CREATE_KANBAN_SUCCESS = 'CREATE_KANBAN_SUCCESS';
export const CREATE_KANBAN_FAILURE = 'CREATE_KANBAN_FAILURE';

export function createKanbanRequest(
  createKanbanInput: CreateKanbanInput
): FSAction {
  return {
    type: CREATE_KANBAN_REQUEST,
    payload: createKanbanInput
  };
}

export function createKanbanSuccess(id: string): FSAction {
  return {
    type: CREATE_KANBAN_SUCCESS,
    payload: id
  };
}

export function createKanbanFailure(): FSAction {
  return {
    type: CREATE_KANBAN_FAILURE,
    error: true
  };
}

export const CREATE_KANBAN_COLUMN_REQUEST = 'CREATE_KANBAN_COLUMN_REQUEST';
export const CREATE_KANBAN_COLUMN_SUCCESS = 'CREATE_KANBAN_COLUMN_SUCCESS';
export const CREATE_KANBAN_COLUMN_FAILURE = 'CREATE_KANBAN_COLUMN_FAILURE';

export function createKanbanColumnRequest(
  createKanbanColumnInput: CreateKanbanColumnInput
): FSAction {
  return {
    type: CREATE_KANBAN_COLUMN_REQUEST,
    payload: createKanbanColumnInput
  };
}

export function createKanbanColumnSuccess(
  id: string,
  meta: {
    kanbanId: string;
  }
): FSAction {
  return {
    type: CREATE_KANBAN_COLUMN_SUCCESS,
    payload: id,
    meta
  };
}

export function createKanbanColumnFailure(): FSAction {
  return {
    type: CREATE_KANBAN_COLUMN_FAILURE,
    error: true
  };
}
