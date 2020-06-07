import { ProjectState } from '../project.reducer';
import { FSAction } from '../../actions/actions';
import { normalize } from 'normalizr';
import { ProjectEntity } from '../../schema';

export function reduceProjectDetailSuccess(
  state: ProjectState,
  action: FSAction
): ProjectState {
  const normalizedAddBoard = normalize(action.payload, ProjectEntity);
  return {
    ...state,
    projectMap: {
      ...state.projectMap,
      ...normalizedAddBoard.entities.Project,
    },
  };
}
