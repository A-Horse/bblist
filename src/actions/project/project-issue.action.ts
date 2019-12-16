import { PagtiationList } from '../../typings/pagtiation.typing';
import { CreateProjectCardInput, ProjectIssue, RankProjectCardInKanbanInput } from '../../typings/project-issue.typing';
import { FSAction } from '../actions';

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

export function getColumnCardsSuccess(payload: { cards: ProjectIssue[]; kanbanId: string; columnId: string }): FSAction {
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

export const GET_PROJECT_ISSUES_REQUEST = 'GET_PROJECT_ISSUES_REQUEST';
export const GET_PROJECT_ISSUES_SUCCESS = 'GET_PROJECT_ISSUES_SUCCESS';
export const GET_PROJECT_ISSUES_FAILURE = 'GET_PROJECT_ISSUES_FAILURE';
export const GET_PROJECT_ISSUES_SUCCESS_IN_PROJECT_ISSUE = 'GET_PROJECT_ISSUES_SUCCESS_IN_PROJECT_ISSUE';

export function getProjectIssuesRequest(
  payload: { projectId: string; pageSize: number; pageNumber: number },
  meta: {
    requestDoneCallback: Function;
  }
): FSAction {
  return {
    type: GET_PROJECT_ISSUES_REQUEST,
    payload,
    meta
  };
}

export function getProjectIssuesSuccess(payload: { cardPagtiton: PagtiationList<ProjectIssue>; projectId: string }): FSAction {
  return {
    type: GET_PROJECT_ISSUES_SUCCESS,
    payload
  };
}

export function getProjectIssuesSuccessInProjectIssue(payload: { cardPagtiton: PagtiationList<ProjectIssue>; projectId: string }): FSAction {
  return {
    type: GET_PROJECT_ISSUES_SUCCESS_IN_PROJECT_ISSUE,
    payload
  };
}

export function getProjectIssuesFailure(error: any): FSAction {
  return {
    type: GET_PROJECT_ISSUES_FAILURE,
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

export const CHANGE_PROJECT_CARD_COLUMN_REQUEST = 'CHANGE_PROJECT_CARD_COLUMN_REQUEST';
export const CHANGE_PROJECT_CARD_COLUMN_SUCCESS = 'CHANGE_PROJECT_CARD_COLUMN_SUCCESS';
export const CHANGE_PROJECT_CARD_COLUMN_FAILURE = 'CHANGE_PROJECT_CARD_COLUMN_FAILURE';

export function changeProjectCardColumnRequest(RankProjectCardInKanbanInput: RankProjectCardInKanbanInput): FSAction {
  return {
    type: CHANGE_PROJECT_CARD_COLUMN_REQUEST,
    payload: RankProjectCardInKanbanInput
  };
}

export function changeProjectCardColumnSuccess(id: string): FSAction {
  return {
    type: CHANGE_PROJECT_CARD_COLUMN_SUCCESS,
    payload: id
  };
}

export function changeProjectCardColumnFailure(): FSAction {
  return {
    type: CHANGE_PROJECT_CARD_COLUMN_FAILURE,
    error: true
  };
}

export const RANK_PROJECT_CARD_IN_KANBAN_REQUEST = 'RANK_PROJECT_CARD_IN_KANBAN_REQUEST';
export const RANK_PROJECT_CARD_IN_KANBAN_SUCCESS = 'RANK_PROJECT_CARD_IN_KANBAN_SUCCESS';
export const RANK_PROJECT_CARD_IN_KANBAN_FAILURE = 'RANK_PROJECT_CARD_IN_KANBAN_FAILURE';

export function rankProjectCardInKanbanRequest(
  rankProjectCardInKanbanInput: RankProjectCardInKanbanInput,
  meta: {
    temporary: boolean;
  }
): FSAction {
  return {
    type: RANK_PROJECT_CARD_IN_KANBAN_REQUEST,
    payload: rankProjectCardInKanbanInput,
    meta: meta
  };
}

export function rankProjectCardInKanbanSuccess(newOrders: { cardId: string; order: number }[]): FSAction {
  return {
    type: RANK_PROJECT_CARD_IN_KANBAN_SUCCESS,
    payload: newOrders
  };
}

export function rankProjectCardInKanbanFailure(error: Error): FSAction {
  return {
    type: RANK_PROJECT_CARD_IN_KANBAN_FAILURE,
    error: true,
    payload: error
  };
}
