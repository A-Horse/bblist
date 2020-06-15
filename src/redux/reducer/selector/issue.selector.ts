import { RootState } from '../index';
import { IProjectIssue } from '../../../typings/project-issue.typing';

export function selectIssue(state: RootState, issueId: string): IProjectIssue {
  return state.project.issueMap[issueId];
}

export function selectProjectIssues(
  state: RootState,
  projectId: string
): IProjectIssue[] {
  return state.project.allIssueId
    .map((id) => state.project.issueMap[id])
    .filter((v) => !!v)
    .sort((a, b) => a.order - b.order);
}
