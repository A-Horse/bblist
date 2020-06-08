import { ProjectState } from '../project.reducer';
import { AxiosSuccessAction, FSAction } from '../../actions/actions';
import { getProjectIssueDetailRequest } from '../../actions/project-issue-detail.action';
import { IProjectIssue } from '../../../typings/project-issue.typing';
import uniq from 'lodash/uniq';

export function reduceUpdateProjectIssue(
  state: ProjectState,
  action: FSAction
): ProjectState {
  const issueId = action.payload.id;
  return {
    ...state,
    issueMap: {
      ...state.issueMap,
      [issueId]: {
        ...state.issueMap[issueId],
        ...action.payload,
      },
    },
  };
}

export function reduceIssueDetailSuccess(
  state: ProjectState,
  action: AxiosSuccessAction<ReturnType<typeof getProjectIssueDetailRequest>>
): ProjectState {
  const issue: IProjectIssue = action.payload.data;
  let columnMap = state.columnMap;
  if (issue.columnId) {
    columnMap = {
      ...columnMap,
      [issue.columnId]: {
        ...columnMap[issue.columnId],
        issues: uniq([...(columnMap[issue.columnId].issues as any), issue.id]),
      },
    };
  }

  return {
    ...state,
    issueMap: {
      ...state.issueMap,
      [issue.id]: {
        ...state.issueMap[issue.id],
        ...issue,
      },
    },
    columnMap: columnMap,
  };
}
