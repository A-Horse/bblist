import {
  IProjectIssue,
  UpdateIssueInput,
} from '../../typings/project-issue.typing';
import { FSAction } from './actions';

export const GET_PROJECT_ISSUE_DETAIL_REQUEST =
  'GET_PROJECT_ISSUE_DETAIL_REQUEST';
export const GET_PROJECT_ISSUE_DETAIL_SUCCESS =
  'GET_PROJECT_ISSUE_DETAIL_SUCCESS';
export const GET_PROJECT_ISSUE_DETAIL_FAILURE =
  'GET_PROJECT_ISSUE_DETAIL_FAILURE';

export function getProjectIssueDetailRequest(input: {
  issueId: string;
}): FSAction {
  return {
    type: 'GET_PROJECT_ISSUE_DETAIL',
    payload: {
      request: {
        url: `/issue/${input.issueId}`,
      },
    },
  };
}

export function updateIssueDetailRequest(input: UpdateIssueInput) {
  return {
    type: 'UPDATE_ISSUE_DETAIL',
    payload: input,
  };
}
