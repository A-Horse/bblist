import { RootState } from '../index';
import { IIssue } from '../../../typings/project-issue.typing';

export function selectProjectIssues(
  state: RootState,
  projectId: string
): IIssue[] {
  return state.project.allIssueId
    .map((id) => state.project.issueMap[id])
    .filter((v) => !!v)
    .sort((a, b) => a.order - b.order);
}

export function selectIssue(state: RootState, issueId: string): IIssue {
  return state.project.issueMap[issueId];
}
