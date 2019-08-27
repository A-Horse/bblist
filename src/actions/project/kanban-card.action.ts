import { Card, CreateProjectCardInput } from './../../typings/kanban-card.typing';
import { FSAction } from './../actions';

export const GET_COLUMN_CARDS_REQUEST = 'GET_COLUMN_CARDS_REQUEST';
export const GET_COLUMN_CARDS_SUCCESS = 'GET_COLUMN_CARDS_SUCCESS';
export const GET_COLUMN_CARDS_FAILURE = 'GET_COLUMN_CARDS_FAILURE';

export function getColumnCardsRequest(
  payload: { kanbanId: string; columnId: string },
  meta: {
    requestDoneCallback: Function;
  }
): FSAction {
  return {
    type: GET_COLUMN_CARDS_REQUEST,
    payload,
    meta
  };
}

export function getColumnCardsSuccess(payload: { cards: Card[] }): FSAction {
  return {
    type: GET_COLUMN_CARDS_SUCCESS,
    payload
  };
}

export function getColumnCardsFailure(error: any): FSAction {
  return {
    type: GET_COLUMN_CARDS_FAILURE,
    error: true,
    payload: error
  };
}


export const CREATAE_PROJECT_CARD_REQUEST = 'CREATAE_PROJECT_CARD_REQUEST';
export const CREATAE_PROJECT_CARD_SUCCESS = 'CREATAE_PROJECT_CARD_SUCCESS';
export const CREATAE_PROJECT_CARD_FAILURE = 'CREATAE_PROJECT_CARD_FAILURE';

export function createProjectCardRequest(createKanbanCardInput: CreateProjectCardInput): FSAction {
  return {
    type: CREATAE_PROJECT_CARD_REQUEST,
    payload: createKanbanCardInput
  };
}

export function createProjectCardSuccess(id: string): FSAction {
  return {
    type: CREATAE_PROJECT_CARD_SUCCESS,
    payload: id
  };
}

export function createProjectCardFailure(): FSAction {
  return {
    type: CREATAE_PROJECT_CARD_FAILURE,
    error: true
  };
}