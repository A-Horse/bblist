import { UpdateIssueInput } from '../../typings/project-issue.typing';
import { FSAction } from './actions';

export function queryProjectIssueDetailRequest(input: {
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
