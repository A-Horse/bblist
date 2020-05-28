import { ProjectIssue } from '../../../typings/project-issue.typing';
import { FSAction } from '../actions';

export const GET_PROJECT_ISSUE_DETAIL_REQUEST =
  'GET_PROJECT_ISSUE_DETAIL_REQUEST';
export const GET_PROJECT_ISSUE_DETAIL_SUCCESS =
  'GET_PROJECT_ISSUE_DETAIL_SUCCESS';
export const GET_PROJECT_ISSUE_DETAIL_FAILURE =
  'GET_PROJECT_ISSUE_DETAIL_FAILURE';

export function getProjectIssueDetailRequest(payload: {
  issueId: string;
}): FSAction {
  return {
    type: GET_PROJECT_ISSUE_DETAIL_REQUEST,
    payload
  };
}

export function getProjectIssueDetailSuccess(issue: ProjectIssue): FSAction {
  return {
    type: GET_PROJECT_ISSUE_DETAIL_SUCCESS,
    payload: issue
  };
}

export function getProjectIssueDetailFailure(): FSAction {
  return {
    type: GET_PROJECT_ISSUE_DETAIL_FAILURE,
    error: true
  };
}

export const CHANGE_ISSUE_DIRECT = 'CHANGE_ISSUE_DIRECT';

export function changeIssueDirect(issueId: string, partialIssue: any) {
  return {
    type: CHANGE_ISSUE_DIRECT,
    payload: {
      issueId,
      partialIssue
    }
  };
}

export const UPDATE_PROJECT_ISSUE_DETAIL_REQUEST =
  'UPDATE_PROJECT_ISSUE_DETAIL_REQUEST';
export const UPDATE_PROJECT_ISSUE_DETAIL_SUCCESS =
  'UPDATE_PROJECT_ISSUE_DETAIL_SUCCESS';
export const UPDATE_PROJECT_ISSUE_DETAIL_FAILURE =
  'UPDATE_PROJECT_ISSUE_DETAIL_FAILURE';

export function updateProjectIssueDetailRequest(
  payload: { issueId: string; partialIssue: any },
  meta: { callback: Function }
): FSAction {
  return {
    type: UPDATE_PROJECT_ISSUE_DETAIL_REQUEST,
    payload,
    meta
  };
}

export function updateProjectIssueDetailSuccess(payload): FSAction {
  return {
    type: UPDATE_PROJECT_ISSUE_DETAIL_SUCCESS,
    payload
  };
}

export function updateProjectIssueDetailFailure(): FSAction {
  return {
    type: UPDATE_PROJECT_ISSUE_DETAIL_FAILURE,
    error: true
  };
}
