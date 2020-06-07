import { IKanban } from '../../../typings/kanban.typing';
import { normalize } from 'normalizr';
import { KanbanDetailEntity, KanbanEntityList } from '../../schema';
import { ProjectState } from '../project.reducer';
import { AxiosSuccessAction, FSAction } from '../../actions/actions';
import { reduceNormalizeMap } from '../util/util';

export function reduceKanbanDetailSuccess(
  state: ProjectState,
  action: AxiosSuccessAction
): ProjectState {
  const normalizedData: {
    entities: {
      Kanban: {
        [id: string]: IKanban;
      };
    };
    result: string[];
  } = normalize(action.payload.data, KanbanDetailEntity);
  const kanbanId = action.meta.previousAction.payload.kanbanId;
  const normalizedKanban: IKanban = normalizedData.entities.Kanban[kanbanId];

  return {
    ...state,
    kanbanMap: {
      ...state.kanbanMap,
      [kanbanId]: {
        ...state.kanbanMap[kanbanId],
        ...normalizedKanban,
      },
    },
  };
}

export function reduceProjectKanban(
  state: ProjectState,
  action: FSAction
): ProjectState {
  const normalizedKanbans: {
    entities: {
      Kanban: {
        [id: string]: IKanban;
      };
    };
    result: string[];
  } = normalize(action.payload.kanbans, KanbanEntityList);
  const projectId = action.payload.projectId;
  return {
    ...state,
    projectMap: {
      ...state.projectMap,
      [projectId]: {
        ...state.projectMap[projectId],
        kanbanIds: normalizedKanbans.result,
      },
    },
    kanbanMap: reduceNormalizeMap(
      state.kanbanMap,
      normalizedKanbans.entities.Kanban
    ),
  };
}
