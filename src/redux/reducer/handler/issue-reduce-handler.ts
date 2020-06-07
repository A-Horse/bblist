import { ProjectState } from '../project.reducer';
import { AxiosSuccessAction, FSAction } from '../../actions/actions';
import { getProjectIssueDetailRequest } from '../../actions/project-issue-detail.action';

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
        ...state.projectMap[issueId],
        ...action.payload,
      },
    },
  };
}

export function reduceIssueDetailSuccess(
  state: ProjectState,
  action: AxiosSuccessAction<ReturnType<typeof getProjectIssueDetailRequest>>
): ProjectState {
  return {
    ...state,
    issueMap: {
      ...state.issueMap,
      [action.payload.data.id]: {
        ...state.issueMap[action.payload.data.id],
        ...action.payload.data,
      },
    },
  };
}
