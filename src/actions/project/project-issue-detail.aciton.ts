import { FSAction } from './../actions';

export const GET_PROJECT_ISSUE_DETAIL_DEQUEST = 'GET_PROJECT_ISSUE_DETAIL_DEQUEST';
export const GET_PROJECT_ISSUE_DETAIL_SUCCESS = 'GET_PROJECT_ISSUE_DETAIL_SUCCESS';
export const GET_PROJECT_ISSUE_DETAIL_FAILURE = 'GET_PROJECT_ISSUE_DETAIL_FAILURE';

export function getProjectIssueDetailRequest(
    payload: {
        issueId: string;
    }
): FSAction {
  return {
    type: GET_PROJECT_ISSUE_DETAIL_DEQUEST,
    payload
  };
}

export function getProjectIssueDetailSuccess(): FSAction {
  return {
    type: GET_PROJECT_ISSUE_DETAIL_SUCCESS
  };
}

export function getProjectIssueDetailFailure(): FSAction {
  return {
    type: GET_PROJECT_ISSUE_DETAIL_FAILURE,
    error: true
  };
}
