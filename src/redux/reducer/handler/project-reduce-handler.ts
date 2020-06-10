import { ProjectState } from '../project.reducer';
import { FSAction } from '../../actions/actions';
import { normalize } from 'normalizr';
import { ProjectEntity } from '../../schema';
import { updateProjectRequest } from '../../actions/project.action';

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

export function reduceUpdateProject(
  state: ProjectState,
  action: ReturnType<typeof updateProjectRequest>
): ProjectState {
  return {
    ...state,
    projectMap: {
      [action.meta.id]: {
        ...state.projectMap[action.meta.id],
        ...action.meta,
      },
    },
  };
}
