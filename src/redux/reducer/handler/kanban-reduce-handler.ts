import { IKanban } from '../../../typings/kanban.typing';
import { normalize } from 'normalizr';
import { KanbanDetailEntity, KanbanEntityList, IssueList } from '../../schema';
import { ProjectState } from '../project.reducer';
import { AxiosSuccessAction, FSAction } from '../../actions/actions';
import { reduceNormalizeMap } from '../util/util';
import {
  getUserKanbansRequest,
  queryKanbanRecentlyIssues,
} from '../../actions/kanban.action';

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
    loadingKanban: false
  };
}

export function reduceProjectKanban(
  state: ProjectState,
  action: FSAction
): ProjectState {
  return {
    ...state,
    loadingKanbans: true,
  };
}

export function reduceProjectKanbanSuccess(
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
    loadingKanbans: false,
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

export function reduceKanbanRecentlyIssuesSuccess(
  state: ProjectState,
  action: AxiosSuccessAction<ReturnType<typeof queryKanbanRecentlyIssues>>
): ProjectState {
  const kanbanId = action.meta.previousAction.meta.kanbanId;
  const normalizedIssuesData = normalize(action.payload.data, IssueList);
  return {
    ...state,
    kanbanMap: {
      ...state.kanbanMap,
      [kanbanId]: {
        ...state.kanbanMap[kanbanId],
        recentlyIssueIds: normalizedIssuesData.result,
      },
    },
    issueMap: reduceNormalizeMap(
      state.issueMap,
      normalizedIssuesData.entities.Issue
    ),
  };
}

export function reduceGetKanbansSuccess(
  state: ProjectState,
  action: AxiosSuccessAction<ReturnType<typeof getUserKanbansRequest>>
) {
  const newKanbanMap = action.payload.data.reduce((result, cur) => {
    result[cur.id] = {
      ...state.kanbanMap[cur.id],
      ...cur,
    };
    return result;
  }, {});
  return {
    ...state,
    kanbanMap: {
      ...state.kanbanMap,
      ...newKanbanMap,
    },
  };
}
