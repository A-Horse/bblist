import { PaginationList } from '../../typings/pagination.typing';
import {
  CreateProjectIssueInput,
  IProjectIssue,
  RankProjectCardInKanbanInput,
} from '../../typings/project-issue.typing';
import { FSAction } from './actions';

export const GET_COLUMN_CARDS_REQUEST = 'GET_COLUMN_CARDS_REQUEST';
export const GET_COLUMN_CARDS_SUCCESS = 'GET_COLUMN_CARDS_SUCCESS';
export const GET_COLUMN_CARDS_FAILURE = 'GET_COLUMN_CARDS_FAILURE';

export function getColumnCardsSuccess(payload: {
  cards: IProjectIssue[];
  kanbanId: string;
  columnID: string;
}): FSAction {
  return {
    type: GET_COLUMN_CARDS_SUCCESS,
    payload,
  };
}

export function getColumnCardsFailure(error: any): FSAction {
  return {
    type: GET_COLUMN_CARDS_FAILURE,
    error: true,
    payload: error,
  };
}

export function getProjectIssuesRequest(payload: {
  projectId: string;
}): FSAction {
  return {
    type: `GET_PROJECT_ISSUES`,
    payload: {
      request: {
        url: `/project/${payload.projectId}/issues`,
      },
    },
  };
}

export function createIssueRequest(
  createKanbanCardInput: CreateProjectIssueInput
) {
  return {
    type: 'CREATE_PROJECT_ISSUE',
    payload: {
      request: {
        url: '/issue',
        data: createKanbanCardInput,
        method: 'POST',
        responseType: 'text',
      },
    },
  };
}
