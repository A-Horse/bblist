import { ProjectState } from '../project.reducer';
import { FSAction } from '../../actions/actions';

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
