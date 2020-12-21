import { ProjectState } from '../project.reducer';
import { FSAction } from '../../actions/actions';
import { normalize } from 'normalizr';
import { ProjectEntity } from '../../schema';
import { updateProjectRequest } from '../../actions/project.action';

export function reduceProjectDetailSuccess(
  state: ProjectState,
  action: FSAction
): ProjectState {
  const normalizedData = normalize(action.payload, ProjectEntity);
  const projectId = normalizedData.result;

  return {
    ...state,
    projectMap: {
      ...state.projectMap,
      [projectId]: {
        ...state.projectMap[projectId],
        ...normalizedData.entities.Project[projectId],
      },
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
