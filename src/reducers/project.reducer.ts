import { FSAction } from './../actions/actions';
import { ProjectEntity, ProjectEntityList } from './../schema';
import { Project } from './../typings/project/project.typing';
import { GET_PROJCETS_SUCCESS, CREATE_PROJCET_SUCCESS } from './../actions/project/project.action';
import { normalize } from 'normalizr';
import { fromJS, Record, Map } from 'immutable';

export interface TaskStateProp {
  projectMap: Map<string, Record<Project>>;
}

export function project(
  state: Record<TaskStateProp> = fromJS({
    projectMap: {}
  }),
  action: FSAction
) {
  switch (action.type) {
    case GET_PROJCETS_SUCCESS:
      const normalizedAllBoard = normalize(action.payload, ProjectEntityList);
      return state.update('projectMap', () => fromJS(normalizedAllBoard.entities.Project));

    case CREATE_PROJCET_SUCCESS:
      const normalizedAddBoard = normalize(action.payload, ProjectEntity);
      return state.update('projectMap', projectMap =>
        projectMap.merge(fromJS(normalizedAddBoard.entities.Project))
      );

    default:
      return state;
  }
}
