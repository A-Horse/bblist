import { Kanban, KanbanRecord } from './../typings/kanban.typing';
import { FSAction } from './../actions/actions';
import { ProjectEntity, ProjectEntityList, KanbanEntityList } from './../schema';
import { ProjectRecord } from '../typings/project.typing';
import {
  GET_PROJCETS_SUCCESS,
  CREATE_PROJCET_SUCCESS,
  GET_PROJCET_DETAIL_SUCCESS
} from './../actions/project/project.action';
import { normalize } from 'normalizr';
import { fromJS, Record, Map } from 'immutable';
import {
  GET_PROJCET_KANBANS_SUCCESS,
  GET_PROJCET_KANBAN_DETAIL_SUCCESS
} from '../actions/project/kanban.action';

export type KanbanMap = Map<string, KanbanRecord>;

export interface ProjectProp {
  projectMap: Map<string, ProjectRecord>;
  kanbanMap: KanbanMap;
}

export function project(
  state: Record<ProjectProp> = fromJS({
    projectMap: {},
    kanbanMap: {}
  }),
  action: FSAction
) {
  switch (action.type) {
    case GET_PROJCETS_SUCCESS: {
      const normalizedAllBoard = normalize(action.payload, ProjectEntityList);
      return state.update('projectMap', () => fromJS(normalizedAllBoard.entities.Project));
    }

    case CREATE_PROJCET_SUCCESS:
      return state;

    case GET_PROJCET_DETAIL_SUCCESS: {
      const normalizedAddBoard = normalize(action.payload, ProjectEntity);
      return state.update('projectMap', projectMap =>
        projectMap.merge(fromJS(normalizedAddBoard.entities.Project))
      );
    }

    case GET_PROJCET_KANBANS_SUCCESS: {
      const normalizedKanbans: {
        entities: {
          Kanban: {
            [id: string]: Kanban;
          };
        };
        result: string[];
      } = normalize(action.payload.kanbans, KanbanEntityList);

      return state
        .updateIn(['projectMap', action.payload.projectId], (project: ProjectRecord) => {
          return project.set('kanbanIds', normalizedKanbans.result);
        })
        .update('kanbanMap', (kanbanMap: KanbanMap) => {
          return kanbanMap.merge(fromJS(normalizedKanbans.entities.Kanban));
        });
    }

    case GET_PROJCET_KANBAN_DETAIL_SUCCESS: {
      return state.updateIn(['kanbanMap', action.payload.kanban.id], (kanban: KanbanRecord) => {
        if (!kanban) {
          return;
        }
        return kanban.merge(fromJS(action.payload.kanban));
      });
    }
    default:
      return state;
  }
}
