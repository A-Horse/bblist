import { PaginationList } from '../../typings/pagination.typing';
import {
  CreateProjectIssueInput,
  ProjectIssue,
  RankProjectCardInKanbanInput
} from '../../typings/project-issue.typing';
import { FSAction } from '../actions';

export const GET_COLUMN_CARDS_REQUEST = 'GET_COLUMN_CARDS_REQUEST';
export const GET_COLUMN_CARDS_SUCCESS = 'GET_COLUMN_CARDS_SUCCESS';
export const GET_COLUMN_CARDS_FAILURE = 'GET_COLUMN_CARDS_FAILURE';

export function getColumnCardsRequest(
  payload: { kanbanId: string; columnID: string },
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

export function getColumnCardsSuccess(payload: {
  cards: ProjectIssue[];
  kanbanId: string;
  columnID: string;
}): FSAction {
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
export const GET_PROJECT_ISSUES_SUCCESS_IN_PROJECT_ISSUE =
  'GET_PROJECT_ISSUES_SUCCESS_IN_PROJECT_ISSUE';

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

export function getProjectIssuesSuccess(payload: {
  cardPagtiton: PaginationList<ProjectIssue>;
  projectId: string;
}): FSAction {
  return {
    type: GET_PROJECT_ISSUES_SUCCESS,
    payload
  };
}

export function getProjectIssuesSuccessInProjectIssue(payload: {
  cardPagtiton: PaginationList<ProjectIssue>;
  projectId: string;
}): FSAction {
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

export const CREATE_PROJECT_ISSUE_REQUEST = 'CREATE_PROJECT_ISSUE_REQUEST';
export const CREATE_PROJECT_ISSUE_SUCCESS = 'CREATE_PROJECT_ISSUE_SUCCESS';
export const CREATE_PROJECT_ISSUE_FAILURE = 'CREATE_PROJECT_ISSUE_FAILURE';

export function createProjectCardRequest(
  createKanbanCardInput: CreateProjectIssueInput,
  meta: { callback? } = {}
) {
  return {
    type: CREATE_PROJECT_ISSUE_REQUEST,
    payload: createKanbanCardInput,
    meta
  };
}

export function createProjectCardSuccess(id: string): FSAction {
  return {
    type: CREATE_PROJECT_ISSUE_SUCCESS,
    payload: id
  };
}

export function createProjectCardFailure(error): FSAction {
  return {
    type: CREATE_PROJECT_ISSUE_FAILURE,
    payload: error,
    error: true
  };
}

export const CHANGE_PROJECT_CARD_COLUMN_REQUEST =
  'CHANGE_PROJECT_CARD_COLUMN_REQUEST';
export const CHANGE_PROJECT_CARD_COLUMN_SUCCESS =
  'CHANGE_PROJECT_CARD_COLUMN_SUCCESS';
export const CHANGE_PROJECT_CARD_COLUMN_FAILURE =
  'CHANGE_PROJECT_CARD_COLUMN_FAILURE';

export function changeProjectCardColumnRequest(
  RankProjectCardInKanbanInput: RankProjectCardInKanbanInput
): FSAction {
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

export const RANK_PROJECT_CARD_IN_KANBAN_REQUEST =
  'RANK_PROJECT_CARD_IN_KANBAN_REQUEST';
export const RANK_PROJECT_CARD_IN_KANBAN_SUCCESS =
  'RANK_PROJECT_CARD_IN_KANBAN_SUCCESS';
export const RANK_PROJECT_CARD_IN_KANBAN_FAILURE =
  'RANK_PROJECT_CARD_IN_KANBAN_FAILURE';

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

export function rankProjectCardInKanbanSuccess(
  newOrders: { cardId: string; order: number }[]
): FSAction {
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
