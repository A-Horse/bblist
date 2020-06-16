import {
  CreateProjectIssueInput,
  IProjectIssue,
} from '../../typings/project-issue.typing';
import { FSAction } from './actions';
import { IProject } from '../../typings/project.typing';

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

export function rankIssue(issue: IProjectIssue, targetIssue: IProjectIssue, isBefore: boolean) {
  return {
    type: 'RANK_ISSUE',
    payload: {
      issue,
      targetIssue,
      isBefore
    },
  };
}