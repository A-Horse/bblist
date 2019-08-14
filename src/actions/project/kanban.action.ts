import { CreateKanbanInput } from './../../typings/kanban.typing';
import { FSAction } from './../actions';
import { Kanban } from '../../typings/kanban.typing';

export const GET_PROJCET_KANBANS_REQUEST = 'GET_PROJCET_KANBANS_REQUEST';
export const GET_PROJCET_KANBANS_SUCCESS = 'GET_PROJCET_KANBANS_SUCCESS';
export const GET_PROJCET_KANBANS_FAILURE = 'GET_PROJCET_KANBANS_FAILURE';

export function getProjectKanbansRequest(payload: {projectId: string}): FSAction {
  return {
    type: GET_PROJCET_KANBANS_REQUEST,
    payload
  };
}

export function getProjectKanbansSuccess(payload: {projectId: string, kanbans: Kanban[]}): FSAction {
  return {
    type: GET_PROJCET_KANBANS_SUCCESS,
    payload
  };
}

export function getProjectKanbansFailure(): FSAction {
  return {
    type: GET_PROJCET_KANBANS_FAILURE,
    error: true
  };
}


export const CREATAE_KANBAN_REQUEST = 'CREATAE_KANBAN_REQUEST';
export const CREATAE_KANBAN_SUCCESS = 'CREATAE_KANBAN_SUCCESS';
export const CREATAE_KANBAN_FAILURE = 'CREATAE_KANBAN_FAILURE';

export function createKanbanRequest(createKanbanInput: CreateKanbanInput): FSAction {
  return {
    type: CREATAE_KANBAN_REQUEST,
    payload: createKanbanInput
  };
}

export function createKanbanSuccess(id: string): FSAction {
  return {
    type: CREATAE_KANBAN_SUCCESS,
    payload: id
  };
}

export function createKanbanFailure(): FSAction {
  return {
    type: CREATAE_KANBAN_FAILURE,
    error: true
  };
}
